/* =========================================================
   LCCAST - ANALYTICS PAGE
   Handles SSC/Department tabs, Chart.js rendering, candidate
   photos, PDF export (single graph / campus / full section).

   NOTE: MOCK_DATA is temporary — replace loadAnalyticsData()
   with a real backend call later.
========================================================= */

document.addEventListener("DOMContentLoaded", initializeAnalytics);

// State
let analyticsData = null;
const charts = {};
let currentDepartment = "BSA";

let successToast, successToastTitle, successToastMessage, successToastClose;
let successToastTimer = null;
let actionLoadingModal;
let actionLoadingTitle;
let actionLoadingMessage;

// Campuses
const CAMPUSES = {
  college: "College",
  muzon: "Muzon",
};

// Elections
const SSC_ELECTIONS = [{ id: "ssc-2026", title: "SSC Election 2026" }];

const DEPARTMENT_ELECTIONS = {
  BSA: [{ id: "bsa-2026", title: "BSA Department Election 2026" }],
  BSBA: [{ id: "bsba-2026", title: "BSBA Department Election 2026" }],
  BAEL: [{ id: "bca-2026", title: "BAEL Department Election 2026" }],
  BSCRIM: [{ id: "bscrim-2026", title: "BSCRIM Department Election 2026" }],
  BSCE: [{ id: "eng-2026", title: "Engineering Department Election 2026" }],
  BSHM: [{ id: "bshm-2026", title: "BSHM Department Election 2026" }],
  BSIS: [{ id: "bsis-2026", title: "BSIS Department Election 2026" }],
  BSPSY: [{ id: "bspsy-2026", title: "BSPSY Department Election 2026" }],
  EDUC: [{ id: "bsed-2026", title: "BSEd Department Election 2026" }],
  BSAIS: [{ id: "bsais-2026", title: "BSAIS Department Election 2026" }],
};

// Departments
const DEPARTMENTS = {
  BSA: { acronym: "BSA", name: "Accountancy" },
  BSBA: { acronym: "BSBA", name: "Business Administration" },
  BAEL: { acronym: "BAEL", name: "Communication Arts" },
  BSCRIM: { acronym: "BSCRIM", name: "Criminology" },
  BSCE: { acronym: "BSCE", name: "Engineering" },
  BSHM: { acronym: "BSHM", name: "Hospitality Management" },
  BSIS: { acronym: "BSIS", name: "Information Systems" },
  BSPSY: { acronym: "BSPSY", name: "Psychology" },
  EDUC: { acronym: "EDUC", name: "Teacher Education" },
  BSAIS: { acronym: "BSAIS", name: "Accountancy Information Systems" },
};

/* =========================================================
   SSC PROGRAMS
========================================================= */

const SSC_PROGRAMS = [
  "BSIS",
  "BSHM",
  "BSCRIM",
  "BSPSYCH",
  "EDUC",
  "BSBA",
  "BAEL",
  "BSCE",
  "BSA",
  "BSAIS",
];

/* One fixed color for each program.
   These colors remain the same across every campus. */

const SSC_PROGRAM_COLORS = {
  BSIS: "#5B5CEB",
  BSHM: "#22C55E",
  BSCRIM: "#EF4444",
  BSPSYCH: "#8E45F5",
  EDUC: "#F59E0B",
  BSBA: "#06B6D4",
  BAEL: "#EC4899",
  BSCE: "#14B8A6",
  BSA: "#748FEA",
  BSAIS: "#F97316",
};

/* =========================================================
   MOCK DATA
   Expected shape: { ssc: {...}, departments: { BSA: {...}, ... } }
========================================================= */

const MOCK_DATA = {
  ssc: {
    college: createSSCCampusData("College"),
    muzon: createSSCCampusData("Muzon"),
  },
  departments: Object.fromEntries(
    Object.keys(DEPARTMENTS).map((code) => [
      code,
      {
        college: createDepartmentData(code, "College"),
        muzon: createDepartmentData(code, "Muzon"),
      },
    ]),
  ),
};

function createSSCCampusData(campus) {
  const CAMPUS_PROGRAM_VOTES = {
    college: {
      BSIS: 48,
      BSHM: 42,
      BSCRIM: 39,
      BSPSYCH: 31,
      EDUC: 27,
      BSBA: 56,
      BAEL: 24,
      BSCE: 38,
      BSA: 41,
      BSAIS: 26,
    },

    muzon: {
      BSIS: 21,
      BSHM: 18,
      BSCRIM: 15,
      BSPSYCH: 12,
      EDUC: 10,
      BSBA: 25,
      BAEL: 9,
      BSCE: 17,
      BSA: 19,
      BSAIS: 11,
    },

  };

  const programVotes = CAMPUS_PROGRAM_VOTES[campus.toLowerCase()] || {};

  return {
    campus,

    totalVoters: 500,

    votesCast: Object.values(programVotes).reduce(
      (total, votes) => total + votes,
      0,
    ),

    programVotes: SSC_PROGRAMS.map((program) => ({
      program,
      votes: programVotes[program] || 0,
      color: SSC_PROGRAM_COLORS[program],
    })),

    candidates: [
      {
        name: "Candidate 1",
        votes: 145,
        position: "President",
        photo: "/images/candidates/candidate1.jpg",
      },
      {
        name: "Candidate 2",
        votes: 112,
        position: "President",
        photo: "/images/candidates/candidate2.jpg",
      },
      {
        name: "Candidate 3",
        votes: 98,
        position: "Vice President",
        photo: "/images/candidates/candidate3.jpg",
      },
      {
        name: "Candidate 4",
        votes: 87,
        position: "Secretary",
        photo: "/images/candidates/candidate4.jpg",
      },
      {
        name: "Candidate 5",
        votes: 76,
        position: "Treasurer",
        photo: "/images/candidates/candidate5.jpg",
      },
    ],

    partyLists: [
      { name: "Partylist 1", votes: 245 },
      { name: "Partylist 2", votes: 127 },
    ],

    yearLevel: {
      labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      values: [80, 92, 105, 95],
    },

    activity: {
      labels: [
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
      ],
      values: [8, 23, 51, 77, 112, 148, 201, 286, 372],
    },
  };
}

function createDepartmentData(department, campus) {
  const departmentName = DEPARTMENTS[department]?.name || department;

  return {
    campus,
    totalVoters: 180,
    votesCast: 132,
    candidates: [
      {
        name: `${departmentName} Candidate 1`,
        votes: 64,
        position: "President",
        photo: "/images/candidates/default.jpg",
      },
      {
        name: `${departmentName} Candidate 2`,
        votes: 51,
        position: "President",
        photo: "/images/candidates/default.jpg",
      },
      {
        name: `${departmentName} Candidate 3`,
        votes: 44,
        position: "Vice President",
        photo: "/images/candidates/default.jpg",
      },
      {
        name: `${departmentName} Candidate 4`,
        votes: 38,
        position: "Secretary",
        photo: "/images/candidates/default.jpg",
      },
      {
        name: `${departmentName} Candidate 5`,
        votes: 29,
        position: "Treasurer",
        photo: "/images/candidates/default.jpg",
      },
    ],
    yearLevel: {
      labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      values: [28, 31, 37, 36],
    },
    activity: {
      labels: [
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
      ],
      values: [4, 12, 25, 42, 57, 73, 91, 114, 132],
    },
    status: {
      labels: ["Voted", "Not Yet Voted"],
      values: [132, 48],
    },
  };
}

// Init
async function initializeAnalytics() {
  initializeSuccessToast();
  initializeActionLoadingModal();

  analyticsData = await loadAnalyticsData();

  initializeTabs();
  initializeDepartmentSelector();
  initializeCampusSelectors();
  initializeExportButtons();
  initializeElectionModals();

  renderSSC();
  renderDepartment(currentDepartment);
}

/*
   Backend loader — replace with a real fetch later, e.g.:

   async function loadAnalyticsData() {
       const res = await fetch("/api/superadmin/analytics");
       if (!res.ok) throw new Error("Failed to load analytics");
       return res.json();
   }
*/
async function loadAnalyticsData() {
  return MOCK_DATA;
}

// Tabs
function initializeTabs() {
  const tabs = document.querySelectorAll(".analytics-tab");
  const sections = document.querySelectorAll(".analytics-section");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const section = tab.dataset.section;

      tabs.forEach((item) => item.classList.remove("active"));
      sections.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      if (section === "ssc") {
        document.getElementById("sscAnalytics")?.classList.add("active");
      }
      if (section === "department") {
        document.getElementById("departmentAnalytics")?.classList.add("active");
      }
    });
  });
}

// Department selector
function initializeDepartmentSelector() {
  const selector = document.getElementById("departmentSelector");
  if (!selector) return;

  currentDepartment = selector.value || "BSA";

  selector.addEventListener("change", (event) => {
    currentDepartment = event.target.value;

    const campusSelector = document.getElementById("departmentCampusSelector");
    const campus = campusSelector?.value || "all";

    renderDepartment(currentDepartment, campus);
  });
}

// Campus selectors
function initializeCampusSelectors() {
  const sscSelector = document.getElementById("sscCampusSelector");
  if (sscSelector) {
    sscSelector.addEventListener("change", (event) =>
      renderSSC(event.target.value),
    );
  }

  const departmentCampusSelector = document.getElementById(
    "departmentCampusSelector",
  );
  if (departmentCampusSelector) {
    departmentCampusSelector.addEventListener("change", (event) => {
      renderDepartment(currentDepartment, event.target.value);
    });
  }
}

// SSC
function renderSSC(campusFilter = "all") {
  const container = document.getElementById("sscCampusAnalytics");
  if (!container) return;

  container.innerHTML = "";

  const campusKeys =
    campusFilter === "all" ? Object.keys(CAMPUSES) : [campusFilter];

  campusKeys.forEach((campusKey) => {
    const data = analyticsData.ssc[campusKey];
    if (!data) return;

    const section = createCampusElectionSection(campusKey, data, "ssc");
    container.appendChild(section);

    renderSSCCharts(campusKey, data);
  });
}

function createCampusElectionSection(
  campusKey,
  data,
  type,
  departmentCode = null,
) {
  const section = document.createElement("div");
  section.className = "campus-election-section";

  const campusName = CAMPUSES[campusKey];
  const elections =
    type === "ssc" ? SSC_ELECTIONS : DEPARTMENT_ELECTIONS[departmentCode] || [];

  section.innerHTML = `
        <div class="campus-election-header">
            <div class="campus-election-title">
                <i class="bi bi-geo-alt"></i>
                <div>
                    <h2>${campusName}</h2>
                    <p>${type === "ssc" ? "Supreme Student Council Elections" : `${departmentCode} Department Elections`}</p>
                </div>
            </div>
        </div>
        <div class="campus-election-list">
            ${elections
              .map(
                (election) => `
                <div class="election-item" data-election-id="${election.id}">
                    <div class="election-item-header">
                        <div class="election-title">
                            <i class="bi bi-calendar-event"></i>
                            <span>${election.title}</span>
                        </div>
                        <div class="election-actions">
                            <button type="button" class="election-action-btn archive-election" title="Archive Election">
                                <i class="bi bi-archive"></i>
                            </button>
                            <button type="button" class="election-action-btn delete-election" title="Delete Election">
                                <i class="bi bi-trash"></i>
                            </button>
                            <button type="button" class="election-action-btn expand-election" title="Expand Election">
                                <i class="bi bi-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                    <div class="election-content">
                        <div class="election-export-row">
                            <button
                                type="button"
                                class="election-export-btn"
                                data-campus="${campusKey}"
                                data-election="${election.id}"
                                data-type="${type}"
                                ${departmentCode ? `data-department="${departmentCode}"` : ""}
                            >
                                <i class="bi bi-download"></i>
                                Export Graphs
                            </button>
                        </div>
                        ${createElectionGraphsMarkup(campusKey, data, type, departmentCode)}
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    `;

  initializeElectionActions(section);
  return section;
}

// Election graph markup
function createElectionGraphsMarkup(
  campusKey,
  data,
  type,
  departmentCode = null,
) {
  if (type === "ssc") {
    return `
            <div class="analytics-summary-grid">
                <div class="analytics-summary-card">
                    <div class="summary-icon"><i class="bi bi-people"></i></div>
                    <div><span>Total Voters</span><strong>${data.totalVoters}</strong></div>
                </div>
                <div class="analytics-summary-card">
                    <div class="summary-icon"><i class="bi bi-check2-circle"></i></div>
                    <div><span>Votes Cast</span><strong>${data.votesCast}</strong></div>
                </div>
                <div class="analytics-summary-card">
                    <div class="summary-icon"><i class="bi bi-percent"></i></div>
                    <div><span>Turnout</span><strong>${calculatePercentage(data.votesCast, data.totalVoters)}</strong></div>
                </div>
                <div class="analytics-summary-card">
                    <div class="summary-icon"><i class="bi bi-person-badge"></i></div>
                    <div><span>Candidates</span><strong>${data.candidates.length}</strong></div>
                </div>
            </div>

            <div class="analytics-card">
                <div class="analytics-card-header">
                    <div>
                        <h3>Partylist Vote Distribution</h3>
                        <p>Distribution of votes received by each SSC partylist.</p>
                    </div>
                    <button class="graph-export-btn" data-export="sscPartylistChart-${campusKey}"><i class="bi bi-download"></i></button>
                </div>
                <div class="chart-container chart-container-donut">
                    <canvas id="sscPartylistChart-${campusKey}"></canvas>
                </div>
            </div>

            <div class="analytics-card">
                <div class="analytics-card-header">
                    <div>
                        <h3>Candidate Votes</h3>
                        <p>Votes received by individual SSC candidates.</p>
                    </div>
                    <button class="graph-export-btn" data-export="sscCandidateChart-${campusKey}"><i class="bi bi-download"></i></button>
                </div>
                <div class="chart-container">
                    <canvas id="sscCandidateChart-${campusKey}"></canvas>
                </div>
                <div class="candidate-photo-list" id="sscCandidatePhotos-${campusKey}"></div>
            </div>

            <div class="analytics-two-column">
                <div class="analytics-card">
                    <div class="analytics-card-header">
                        <h3>Voter Turnout</h3>
                        <button class="graph-export-btn" data-export="sscTurnoutChart-${campusKey}"><i class="bi bi-download"></i></button>
                    </div>
                    <div class="chart-container small-chart">
                        <canvas id="sscTurnoutChart-${campusKey}"></canvas>
                    </div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-card-header">
                        <h3>Votes by Year Level</h3>
                        <button class="graph-export-btn" data-export="sscYearChart-${campusKey}"><i class="bi bi-download"></i></button>
                    </div>
                    <div class="chart-container small-chart">
                        <canvas id="sscYearChart-${campusKey}"></canvas>
                    </div>
                </div>
            </div>

            <div class="analytics-card">

                <div class="analytics-card-header">

                    <div>

                        <h3>Votes per Program</h3>

                        <p>
                            SSC votes cast by students from each program within this campus.
                        </p>

                    </div>

                    <button
                        class="graph-export-btn"
                        data-export="sscProgramChart-${campusKey}"
                        title="Export Votes per Program">

                        <i class="bi bi-download"></i>

                    </button>

                </div>

                <div class="chart-container ssc-program-chart">

                    <canvas id="sscProgramChart-${campusKey}"></canvas>

                </div>

            </div>

            <div class="analytics-card">
                <div class="analytics-card-header">
                    <h3>Voting Activity</h3>
                    <button class="graph-export-btn" data-export="sscActivityChart-${campusKey}"><i class="bi bi-download"></i></button>
                </div>
                <div class="chart-container">
                    <canvas id="sscActivityChart-${campusKey}"></canvas>
                </div>
            </div>
        `;
  }

  return createDepartmentGraphsMarkup(campusKey, data, departmentCode);
}

// Department graph markup
function createDepartmentGraphsMarkup(campusKey, data, departmentCode) {
  return `
        <div class="analytics-summary-grid">
            <div class="analytics-summary-card">
                <div class="summary-icon"><i class="bi bi-people"></i></div>
                <div><span>Department Voters</span><strong>${data.totalVoters}</strong></div>
            </div>
            <div class="analytics-summary-card">
                <div class="summary-icon"><i class="bi bi-check2-circle"></i></div>
                <div><span>Votes Cast</span><strong>${data.votesCast}</strong></div>
            </div>
            <div class="analytics-summary-card">
                <div class="summary-icon"><i class="bi bi-percent"></i></div>
                <div><span>Turnout</span><strong>${calculatePercentage(data.votesCast, data.totalVoters)}</strong></div>
            </div>
            <div class="analytics-summary-card">
                <div class="summary-icon"><i class="bi bi-person-badge"></i></div>
                <div><span>Officer Candidates</span><strong>${data.candidates.length}</strong></div>
            </div>
        </div>

        <div class="analytics-card">
            <div class="analytics-card-header">
                <div>
                    <h3>Department Officer Votes</h3>
                    <p>Votes received by department officer candidates.</p>
                </div>
                <button class="graph-export-btn" data-export="departmentCandidateChart-${campusKey}"><i class="bi bi-download"></i></button>
            </div>
            <div class="chart-container">
                <canvas id="departmentCandidateChart-${campusKey}"></canvas>
            </div>
            <div class="candidate-photo-list" id="departmentCandidatePhotos-${campusKey}"></div>
        </div>

        <div class="analytics-two-column">
            <div class="analytics-card">
                <div class="analytics-card-header">
                    <h3>Department Voter Turnout</h3>
                    <button class="graph-export-btn" data-export="departmentTurnoutChart-${campusKey}"><i class="bi bi-download"></i></button>
                </div>
                <div class="chart-container small-chart">
                    <canvas id="departmentTurnoutChart-${campusKey}"></canvas>
                </div>
            </div>
            <div class="analytics-card">
                <div class="analytics-card-header">
                    <h3>Participation by Year Level</h3>
                    <button class="graph-export-btn" data-export="departmentYearChart-${campusKey}"><i class="bi bi-download"></i></button>
                </div>
                <div class="chart-container small-chart">
                    <canvas id="departmentYearChart-${campusKey}"></canvas>
                </div>
            </div>
        </div>

        <div class="analytics-card">
            <div class="analytics-card-header">
                <h3>Department Voting Activity</h3>
                <button class="graph-export-btn" data-export="departmentActivityChart-${campusKey}"><i class="bi bi-download"></i></button>
            </div>
            <div class="chart-container">
                <canvas id="departmentActivityChart-${campusKey}"></canvas>
            </div>
        </div>

        <div class="analytics-card">
            <div class="analytics-card-header">
                <h3>Voting Status</h3>
                <button class="graph-export-btn" data-export="departmentStatusChart-${campusKey}"><i class="bi bi-download"></i></button>
            </div>
            <div class="chart-container chart-container-donut">
                <canvas id="departmentStatusChart-${campusKey}"></canvas>
            </div>
        </div>
    `;
}

// Election item actions (expand/delete/archive/export)
function initializeElectionActions(section) {
  section.querySelectorAll(".expand-election").forEach((button) => {
    button.addEventListener("click", () => {
      const election = button.closest(".election-item");
      if (!election) return;

      const content = election.querySelector(".election-content");
      const isExpanded = election.classList.toggle("expanded");

      if (isExpanded) {
        content.style.display = "block";
        button.innerHTML = `<i class="bi bi-chevron-up"></i>`;
      } else {
        content.style.display = "none";
        button.innerHTML = `<i class="bi bi-chevron-down"></i>`;
      }
    });
  });

  section.querySelectorAll(".delete-election").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const election = button.closest(".election-item");
      if (election) openDeleteElectionModal(election);
    });
  });

  section.querySelectorAll(".archive-election").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const election = button.closest(".election-item");
      if (election) openArchiveElectionModal(election);
    });
  });

  section.querySelectorAll(".election-export-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();

      const type = button.dataset.type;
      const campus = button.dataset.campus;

      if (type === "ssc") {
        await exportCampusSSCPDF(campus);
      } else {
        await exportCampusDepartmentPDF(button.dataset.department, campus);
      }
    });
  });
}

function renderSSCCharts(campusKey, data) {
  renderSSCPartylistChart(data, `sscPartylistChart-${campusKey}`);
  renderSSCCandidateChart(data, `sscCandidateChart-${campusKey}`);
  renderSSCTurnoutChart(data, `sscTurnoutChart-${campusKey}`);
  renderSSCYearChart(data, `sscYearChart-${campusKey}`);
  renderSSCActivityChart(data, `sscActivityChart-${campusKey}`);
  renderSSCProgramChart(data, `sscProgramChart-${campusKey}`);
  renderCandidatePhotos(`sscCandidatePhotos-${campusKey}`, data.candidates);
}

// SSC charts
function renderSSCPartylistChart(data, chartId) {
  createOrUpdateChart(
    chartId,
    "doughnut",
    data.partyLists.map((item) => item.name),
    data.partyLists.map((item) => item.votes),
    {
      title: "SSC Partylist Vote Distribution",
      description: "Distribution of votes received by each SSC partylist.",
    },
  );
}

function renderSSCCandidateChart(data, chartId) {
  createOrUpdateChart(
    chartId,
    "bar",
    data.candidates.map((c) => c.name),
    data.candidates.map((c) => c.votes),
    {
      title: "SSC Candidate Votes",
      description: "Votes received by individual SSC candidates.",
      horizontal: true,
    },
  );
}

function renderSSCTurnoutChart(data, chartId) {
  const voted = data.votesCast;
  const notVoted = Math.max(data.totalVoters - voted, 0);

  createOrUpdateChart(
    chartId,
    "doughnut",
    ["Voted", "Not Yet Voted"],
    [voted, notVoted],
    {
      title: "SSC Voter Turnout",
      description:
        "Comparison between registered SSC voters who voted and those who have not yet voted.",
    },
  );
}

function renderSSCYearChart(data, chartId) {
  createOrUpdateChart(
    chartId,
    "bar",
    data.yearLevel.labels,
    data.yearLevel.values,
    {
      title: "SSC Votes by Year Level",
      description:
        "Number of SSC voters who participated from each year level.",
    },
  );
}

function renderSSCProgramChart(data, chartId) {
  const programs = data.programVotes || [];

  createOrUpdateChart(
    chartId,

    "bar",

    programs.map((item) => item.program),

    programs.map((item) => item.votes),

    {
      title: "SSC Votes per Program",

      description:
        "Number of SSC votes cast by students from each academic program.",

      horizontal: true,

      backgroundColor: programs.map((item) => SSC_PROGRAM_COLORS[item.program]),
    },
  );
}

function renderSSCActivityChart(data, chartId) {
  createOrUpdateChart(
    chartId,
    "line",
    data.activity.labels,
    data.activity.values,
    {
      title: "SSC Voting Activity",
      description:
        "Cumulative SSC voting activity throughout the election period.",
    },
  );
}

// Department
function renderDepartment(departmentCode, campusFilter = "all") {
  const container = document.getElementById("departmentCampusAnalytics");
  if (!container) return;

  container.innerHTML = "";

  const department = DEPARTMENTS[departmentCode];
  if (!department) return;

  const campusKeys =
    campusFilter === "all" ? Object.keys(CAMPUSES) : [campusFilter];

  campusKeys.forEach((campusKey) => {
    const data = analyticsData.departments[departmentCode][campusKey];
    if (!data) return;

    const section = createCampusElectionSection(
      campusKey,
      data,
      "department",
      departmentCode,
    );
    container.appendChild(section);

    renderDepartmentCharts(departmentCode, campusKey, data);
  });
}

// function renderDepartment(departmentCode, campusFilter = "all") {

//     const container = document.getElementById("departmentCampusAnalytics");

//     if (!container) return;

//     container.innerHTML = "";

//     const campusKeys =
//         campusFilter === "all"
//             ? Object.keys(CAMPUSES)
//             : [campusFilter];

//     /* =========================================================
//        ALL DEPARTMENTS
//     ========================================================= */

//     if (departmentCode === "ALL") {

//         Object.keys(DEPARTMENTS).forEach(code => {

//             const departmentData = analyticsData.departments[code];

//             if (!departmentData) return;

//             campusKeys.forEach(campusKey => {

//                 const data = departmentData[campusKey];

//                 if (!data) return;

//                 const section = createCampusElectionSection(
//                     campusKey,
//                     data,
//                     "department",
//                     code
//                 );

//                 container.appendChild(section);

//                 renderDepartmentCharts(
//                     code,
//                     campusKey,
//                     data
//                 );

//             });

//         });

//         return;
//     }

//     /* =========================================================
//        SINGLE DEPARTMENT
//     ========================================================= */

//     const department = DEPARTMENTS[departmentCode];

//     if (!department) return;

//     campusKeys.forEach(campusKey => {

//         const data =
//             analyticsData.departments[departmentCode]?.[campusKey];

//         if (!data) return;

//         const section = createCampusElectionSection(
//             campusKey,
//             data,
//             "department",
//             departmentCode
//         );

//         container.appendChild(section);

//         renderDepartmentCharts(
//             departmentCode,
//             campusKey,
//             data
//         );

//     });

// }

function renderDepartmentCharts(departmentCode, campusKey, data) {
  renderDepartmentCandidateChart(
    data,
    departmentCode,
    `departmentCandidateChart-${campusKey}`,
  );
  renderDepartmentTurnoutChart(
    data,
    departmentCode,
    `departmentTurnoutChart-${campusKey}`,
  );
  renderDepartmentYearChart(
    data,
    departmentCode,
    `departmentYearChart-${campusKey}`,
  );
  renderDepartmentActivityChart(
    data,
    departmentCode,
    `departmentActivityChart-${campusKey}`,
  );
  renderDepartmentStatusChart(
    data,
    departmentCode,
    `departmentStatusChart-${campusKey}`,
  );
  renderCandidatePhotos(
    `departmentCandidatePhotos-${campusKey}`,
    data.candidates,
  );
}

// Department charts
function renderDepartmentCandidateChart(data, departmentCode, chartId) {
  createOrUpdateChart(
    chartId,
    "bar",
    data.candidates.map((c) => c.name),
    data.candidates.map((c) => c.votes),
    {
      title: `${departmentCode} Department Officer Votes`,
      description: `Votes received by candidates running for ${departmentCode} department officer positions.`,
      horizontal: true,
    },
  );
}

function renderDepartmentTurnoutChart(data, departmentCode, chartId) {
  const voted = data.votesCast;
  const notVoted = Math.max(data.totalVoters - voted, 0);

  createOrUpdateChart(
    chartId,
    "doughnut",
    ["Voted", "Not Yet Voted"],
    [voted, notVoted],
    {
      title: `${departmentCode} Department Voter Turnout`,
      description: `Turnout among voters belonging to ${departmentCode}.`,
    },
  );
}

function renderDepartmentYearChart(data, departmentCode, chartId) {
  createOrUpdateChart(
    chartId,
    "bar",
    data.yearLevel.labels,
    data.yearLevel.values,
    {
      title: `${departmentCode} Participation by Year Level`,
      description: `Voting participation among ${departmentCode} students by year level.`,
    },
  );
}

function renderDepartmentActivityChart(data, departmentCode, chartId) {
  createOrUpdateChart(
    chartId,
    "line",
    data.activity.labels,
    data.activity.values,
    {
      title: `${departmentCode} Department Voting Activity`,
      description: `Voting activity among ${departmentCode} students throughout the election period.`,
    },
  );
}

function renderDepartmentStatusChart(data, departmentCode, chartId) {
  createOrUpdateChart(
    chartId,
    "doughnut",
    data.status.labels,
    data.status.values,
    {
      title: `${departmentCode} Voting Status`,
      description: `Registered ${departmentCode} voters who have voted and those who have not yet voted.`,
    },
  );
}

// Force a chart to finish rendering before it's captured for export
async function prepareChartForExport(chart) {
  if (!chart) return;

  chart.stop();
  chart.options.animation = false;
  chart.resize();
  chart.update("none");

  // Let the browser actually paint the finished canvas
  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );
}

// Chart create/update
function createOrUpdateChart(canvasId, type, labels, values, options = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }

  const ctx = canvas.getContext("2d");
  const isHorizontal = options.horizontal === true;

  charts[canvasId] = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: options.title || "",
          data: values,
          backgroundColor:
            options.backgroundColor ||
            (type === "doughnut"
              ? [
                  "#748FEA",
                  "#8E45F5",
                  "#5B5CEB",
                  "#22C55E",
                  "#F59E0B",
                  "#EF4444",
                  "#06B6D4",
                  "#EC4899",
                ]
              : "#748FEA"),
          borderColor: type === "line" ? "#5B5CEB" : undefined,
          borderWidth: type === "line" ? 2 : 1,
          borderRadius: type === "bar" ? 6 : 0,
          fill: type === "line" ? false : undefined,
          tension: type === "line" ? 0.35 : 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: isHorizontal ? "y" : "x",
      plugins: {
        legend: {
          display: type === "doughnut",
          position: "right",
          labels: { font: { family: "Poppins", size: 12 }, padding: 14 },
        },
        tooltip: {
          callbacks: {
            label: (context) => ` ${context.raw} votes`,
          },
        },
      },
      scales:
        type === "doughnut"
          ? {}
          : {
              x: {
                beginAtZero: true,
                ticks: { font: { family: "Poppins", size: 11 } },
              },
              y: {
                beginAtZero: true,
                ticks: { font: { family: "Poppins", size: 11 } },
              },
            },
    },
  });
}

// Candidate photos (alt text carries the candidate's name)
function renderCandidatePhotos(containerId, candidates) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  candidates.forEach((candidate) => {
    const wrapper = document.createElement("div");
    wrapper.className = "candidate-photo";

    const image = document.createElement("img");
    image.src = candidate.photo || "/images/candidates/default.jpg";
    image.alt = candidate.name;
    image.title = candidate.name;

    const label = document.createElement("span");
    label.textContent = candidate.name;

    wrapper.appendChild(image);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
}

// Export buttons
function initializeExportButtons() {
  document.addEventListener("click", async (event) => {
    const button = event.target.closest(".graph-export-btn");
    if (!button) return;

    const chartId = button.dataset.export;
    if (!chartId) return;

    await exportChartPDF(chartId);
  });

  document
    .getElementById("exportSSC")
    ?.addEventListener("click", exportAllSSCPDF);
  document
    .getElementById("exportDepartment")
    ?.addEventListener("click", exportAllDepartmentPDF);
}

// Load jsPDF on demand
let jsPDFPromise = null;

function loadJsPDF() {
  if (window.jspdf) {
    return Promise.resolve(window.jspdf.jsPDF);
  }
  if (jsPDFPromise) {
    return jsPDFPromise;
  }

  jsPDFPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

    script.onload = () => {
      if (window.jspdf?.jsPDF) {
        resolve(window.jspdf.jsPDF);
      } else {
        reject(new Error("jsPDF failed to load."));
      }
    };
    script.onerror = () => reject(new Error("Unable to load jsPDF."));

    document.head.appendChild(script);
  });

  return jsPDFPromise;
}

async function exportChartPDF(
  chartId,
  customTitle = null,
  customDescription = null,
  departmentCode = null,
) {
  const jsPDF = await loadJsPDF();
  const chart = charts[chartId];

  if (!chart) {
    alert("This graph is not available yet.");
    return;
  }

  const canvas = document.getElementById(chartId);
  if (!canvas) {
    alert("This graph could not be found.");
    return;
  }

  // Ensure Chart.js has fully rendered the selected campus chart
  await prepareChartForExport(chart);

  const title = customTitle || getChartTitle(chartId);
  const description = customDescription || getChartDescription(chartId);

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  addPDFHeader(pdf, title, description);

  // Use the Chart.js image rather than reading the canvas directly
  const image = chart.toBase64Image("image/png", 1.0);
  const imageWidth = 180;
  const imageHeight = calculateImageHeight(canvas, imageWidth);

  pdf.addImage(image, "PNG", 15, 48, imageWidth, imageHeight);

  addChartValuesToPDF(pdf, chart, 48 + imageHeight + 12);
  addPDFFooter(pdf, departmentCode);

  pdf.save(`${sanitizeFilename(title)}.pdf`);
}

// Export a single SSC campus
async function exportCampusSSCPDF(campusKey) {
  await prepareChartsForExport("ssc", null, [campusKey]);
  await exportChartsForCampuses("ssc", null, [campusKey]);
}

// Export a single department campus
async function exportCampusDepartmentPDF(departmentCode, campusKey) {
  await prepareChartsForExport("department", departmentCode, [campusKey]);
  await exportChartsForCampuses("department", departmentCode, [campusKey]);
}

// Expand every election in the given campuses and re-render their charts
// so Chart.js has real dimensions to draw into before export.
async function prepareChartsForExport(type, departmentCode, campusKeys) {
  const containerId =
    type === "ssc" ? "sscCampusAnalytics" : "departmentCampusAnalytics";
  const container = document.getElementById(containerId);
  if (!container) return;

  campusKeys.forEach((campusKey) => {
    const electionSection = [
      ...container.querySelectorAll(".campus-election-section"),
    ].find((section) => {
      const heading = section.querySelector(".campus-election-title h2");
      return heading && heading.textContent.trim() === CAMPUSES[campusKey];
    });
    if (!electionSection) return;

    electionSection.querySelectorAll(".election-item").forEach((election) => {
      election.classList.add("expanded");

      const content = election.querySelector(".election-content");
      if (content) content.style.display = "block";

      const expandButton = election.querySelector(".expand-election");
      if (expandButton)
        expandButton.innerHTML = `<i class="bi bi-chevron-up"></i>`;
    });
  });

  // Let display:block apply before Chart.js recalculates canvas sizes
  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );

  for (const campusKey of campusKeys) {
    const data =
      type === "ssc"
        ? analyticsData.ssc[campusKey]
        : analyticsData.departments[departmentCode]?.[campusKey];
    if (!data) continue;

    if (type === "ssc") {
      renderSSCCharts(campusKey, data);
    } else {
      renderDepartmentCharts(departmentCode, campusKey, data);
    }
  }

  // Charts were just recreated (and may be animating) — force them
  // to finish rendering before the PDF is generated.
  const chartTypes =
    type === "ssc"
      ? [
          "sscPartylistChart",
          "sscCandidateChart",
          "sscTurnoutChart",
          "sscYearChart",
          "sscProgramChart",
          "sscActivityChart",
        ]
      : [
          "departmentCandidateChart",
          "departmentTurnoutChart",
          "departmentYearChart",
          "departmentActivityChart",
          "departmentStatusChart",
        ];

  for (const campusKey of campusKeys) {
    for (const chartType of chartTypes) {
      const chart = charts[`${chartType}-${campusKey}`];
      if (chart) await prepareChartForExport(chart);
    }
  }
}

// Export the selected campus(es)/election as one PDF
async function exportChartsForCampuses(type, departmentCode, campusKeys) {
  const jsPDF = await loadJsPDF();

  const chartTypes =
    type === "ssc"
      ? [
          "sscPartylistChart",
          "sscCandidateChart",
          "sscTurnoutChart",
          "sscYearChart",
          "sscProgramChart",
          "sscActivityChart",
        ]
      : [
          "departmentCandidateChart",
          "departmentTurnoutChart",
          "departmentYearChart",
          "departmentActivityChart",
          "departmentStatusChart",
        ];

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let firstPage = true;

  for (const campusKey of campusKeys) {
    for (const chartType of chartTypes) {
      const chartId = `${chartType}-${campusKey}`;
      const chart = charts[chartId];
      const canvas = document.getElementById(chartId);

      if (!chart || !canvas) continue;
      if (canvas.width <= 0 || canvas.height <= 0) {
        console.warn(`Skipping invalid chart: ${chartId}`);
        continue;
      }

      await prepareChartForExport(chart);

      if (!firstPage) pdf.addPage();
      firstPage = false;

      const campusName = CAMPUSES[campusKey];

      const title =
        type === "ssc"
          ? `${campusName} — ${getChartTitle(chartId)}`
          : `${campusName} — ${getDepartmentChartTitle(chartId, departmentCode)}`;

      const description =
        type === "ssc"
          ? getChartDescription(chartId)
          : getDepartmentChartDescription(chartId, departmentCode);

      addPDFHeader(
        pdf,
        title,
        description,
        type === "ssc"
          ? `${campusName} — SSC`
          : `${departmentCode} — ${campusName}`,
      );

      const image = chart.toBase64Image("image/png", 1.0);
      const imageWidth = 180;
      const imageHeight = calculateImageHeight(canvas, imageWidth);

      pdf.addImage(image, "PNG", 15, 48, imageWidth, imageHeight);
      addChartValuesToPDF(pdf, chart, 48 + imageHeight + 12);

      addPDFFooter(
        pdf,
        type === "ssc"
          ? `${campusName} - SSC`
          : `${departmentCode} - ${campusName}`,
      );
    }
  }

  if (firstPage) {
    alert("No graphs are available for this election.");
    return;
  }

  const filename =
    type === "ssc"
      ? `SSC-Graphs-${CAMPUSES[campusKeys[0]]}`
      : `${departmentCode}-Graphs-${CAMPUSES[campusKeys[0]]}`;

  pdf.save(`${sanitizeFilename(filename)}.pdf`);
}

// Export all SSC graphs for the selected campus (or every campus)
async function exportAllSSCPDF() {
  const campusFilter =
    document.getElementById("sscCampusSelector")?.value || "all";
  const campusKeys =
    campusFilter === "all" ? Object.keys(CAMPUSES) : [campusFilter];

  await prepareChartsForExport("ssc", null, campusKeys);
  await exportChartsForCampuses("ssc", null, campusKeys);
}

// Export all graphs for the selected department + campus (or every campus)
async function exportAllDepartmentPDF() {
  const department = DEPARTMENTS[currentDepartment];
  if (!department) {
    alert("The selected department is not available.");
    return;
  }

  const campusFilter =
    document.getElementById("departmentCampusSelector")?.value || "all";
  const campusKeys =
    campusFilter === "all" ? Object.keys(CAMPUSES) : [campusFilter];

  await prepareChartsForExport("department", currentDepartment, campusKeys);
  await exportChartsForCampuses("department", currentDepartment, campusKeys);
}

// PDF header
function addPDFHeader(pdf, title, description, sectionLabel = null) {
  const pageWidth = pdf.internal.pageSize.getWidth();

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  pdf.text(title, 15, 20);

  if (sectionLabel) {
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text(sectionLabel, pageWidth - 15, 20, { align: "right" });
  }

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(100, 116, 139);

  const descriptionLines = pdf.splitTextToSize(description || "", 180);
  pdf.text(descriptionLines, 15, 28);

  pdf.setTextColor(30, 41, 59);
  pdf.setFontSize(9);
  pdf.text(`Generated: ${new Date().toLocaleString()}`, 15, 39);

  pdf.setDrawColor(220, 224, 232);
  pdf.line(15, 43, 195, 43);
}

// PDF footer
function addPDFFooter(pdf, label = "") {
  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  pdf.setTextColor(120, 120, 120);

  pdf.text(
    `LCCast Analytics${label ? " • " + label : ""}`,
    15,
    pageHeight - 10,
  );
  pdf.text("Election Analytics Report", pageWidth - 15, pageHeight - 10, {
    align: "right",
  });

  pdf.setTextColor(30, 41, 59);
}

// Add labels/values table to PDF
function addChartValuesToPDF(pdf, chart, startY) {
  let y = startY;

  const labels = chart.data.labels || [];
  const values = chart.data.datasets?.[0]?.data || [];

  if (!labels.length) return y;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("Labels and Values", 15, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);

  labels.forEach((label, index) => {
    const value = values[index] ?? 0;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }

    pdf.text(`${label}: ${value}`, 20, y);
    y += 5;
  });

  return y;
}

// Chart title/description lookups
function getChartTitle(chartId) {
  const baseChartId = chartId.replace(/-(college|muzon)$/, "");

  const titles = {
    sscPartylistChart: "SSC Partylist Vote Distribution",
    sscCandidateChart: "SSC Candidate Votes",
    sscTurnoutChart: "SSC Voter Turnout",
    sscYearChart: "SSC Votes by Year Level",
    sscActivityChart: "SSC Voting Activity",
    sscProgramChart: "SSC Votes per Program",
    departmentCandidateChart: "Department Officer Votes",
    departmentTurnoutChart: "Department Voter Turnout",
    departmentYearChart: "Participation by Year Level",
    departmentActivityChart: "Department Voting Activity",
    departmentStatusChart: "Voting Status",
  };

  return titles[baseChartId] || "LCCast Analytics";
}

function getChartDescription(chartId) {
  const baseChartId = chartId.replace(/-(college|muzon)$/, "");

  const descriptions = {
    sscPartylistChart: "Distribution of votes received by each SSC partylist.",
    sscCandidateChart: "Votes received by individual SSC candidates.",
    sscTurnoutChart:
      "Comparison between registered SSC voters who voted and those who have not yet voted.",
    sscYearChart: "Number of SSC voters who participated from each year level.",
    sscProgramChart:
      "Number of SSC votes cast by students from each academic program.",
    sscActivityChart:
      "Cumulative SSC voting activity throughout the election period.",
    departmentCandidateChart:
      "Votes received by candidates running for department officer positions.",
    departmentTurnoutChart:
      "Turnout among voters belonging to the selected department.",
    departmentYearChart:
      "Voting participation among students of the selected department by year level.",
    departmentActivityChart:
      "Voting activity among students of the selected department throughout the election period.",
    departmentStatusChart:
      "Registered department voters who have voted and those who have not yet voted.",
  };

  return descriptions[baseChartId] || "";
}

function getDepartmentChartTitle(chartId, departmentCode) {
  const titles = {
    departmentCandidateChart: `${departmentCode} Department Officer Votes`,
    departmentTurnoutChart: `${departmentCode} Department Voter Turnout`,
    departmentYearChart: `${departmentCode} Participation by Year Level`,
    departmentActivityChart: `${departmentCode} Department Voting Activity`,
    departmentStatusChart: `${departmentCode} Voting Status`,
  };

  return titles[chartId] || `${departmentCode} Department Analytics`;
}

function getDepartmentChartDescription(chartId, departmentCode) {
  const descriptions = {
    departmentCandidateChart: `Votes received by candidates running for ${departmentCode} department officer positions.`,
    departmentTurnoutChart: `Turnout only among voters belonging to ${departmentCode}.`,
    departmentYearChart: `Voting participation among ${departmentCode} students by year level.`,
    departmentActivityChart: `Voting activity among ${departmentCode} students throughout the election period.`,
    departmentStatusChart: `Registered ${departmentCode} voters who have voted and those who have not yet voted.`,
  };

  return descriptions[chartId] || "";
}

// Helpers
function calculateImageHeight(canvas, width) {
  if (!canvas.width) return 80;
  return (canvas.height / canvas.width) * width;
}

function updateElement(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function calculatePercentage(value, total) {
  if (!total) return "0%";
  return ((value / total) * 100).toFixed(1) + "%";
}

function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9\s-_]/gi, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Success toast
function initializeSuccessToast() {
  successToast = document.getElementById("successToast");
  successToastTitle = document.getElementById("successToastTitle");
  successToastMessage = document.getElementById("successToastMessage");
  successToastClose = document.getElementById("successToastClose");

  successToastClose?.addEventListener("click", hideSuccessToast);
}

function initializeActionLoadingModal() {
  actionLoadingModal = document.getElementById("actionLoadingModal");
  actionLoadingTitle = document.getElementById("actionLoadingTitle");
  actionLoadingMessage = document.getElementById("actionLoadingMessage");

  if (!actionLoadingModal) {
    console.error("actionLoadingModal was not found.");
  }
}

function showActionLoading(
  title = "Processing...",
  message = "Please wait while we process your request.",
) {
  if (!actionLoadingModal) return;

  if (actionLoadingTitle) {
    actionLoadingTitle.textContent = title;
  }

  if (actionLoadingMessage) {
    actionLoadingMessage.textContent = message;
  }

  actionLoadingModal.classList.add("show");
  document.body.classList.add("modal-loading");
}

function hideActionLoading() {
  if (!actionLoadingModal) return;

  actionLoadingModal.classList.remove("show");
  document.body.classList.remove("modal-loading");
}

function showSuccessToast(
  title = "Success",
  message = "Action completed successfully.",
) {
  if (!successToast) return;

  if (successToastTimer) clearTimeout(successToastTimer);

  if (successToastTitle) successToastTitle.textContent = title;
  if (successToastMessage) successToastMessage.textContent = message;

  successToast.classList.add("show");

  successToastTimer = setTimeout(hideSuccessToast, 3500);
}

function hideSuccessToast() {
  if (!successToast) return;

  successToast.classList.remove("show");

  if (successToastTimer) {
    clearTimeout(successToastTimer);
    successToastTimer = null;
  }
}

// Delete / archive election modals
let deleteElectionModal, archiveElectionModal;
let deleteElectionName, archiveElectionName;
let cancelDeleteElection, cancelArchiveElection;
let confirmDeleteElection, confirmArchiveElection;
let selectedElectionForDelete = null;
let selectedElectionForArchive = null;

function initializeElectionModals() {
  deleteElectionModal = document.getElementById("deleteElectionModal");
  archiveElectionModal = document.getElementById("archiveElectionModal");
  deleteElectionName = document.getElementById("deleteElectionName");
  archiveElectionName = document.getElementById("archiveElectionName");
  cancelDeleteElection = document.getElementById("cancelDeleteElection");
  cancelArchiveElection = document.getElementById("cancelArchiveElection");
  confirmDeleteElection = document.getElementById("confirmDeleteElection");
  confirmArchiveElection = document.getElementById("confirmArchiveElection");

  if (!deleteElectionModal) console.error("deleteElectionModal was not found.");
  if (!archiveElectionModal)
    console.error("archiveElectionModal was not found.");

  cancelDeleteElection?.addEventListener("click", closeDeleteElectionModal);
  cancelArchiveElection?.addEventListener("click", closeArchiveElectionModal);

  archiveElectionModal?.addEventListener("click", (event) => {
    if (event.target === archiveElectionModal) closeArchiveElectionModal();
  });

  deleteElectionModal?.addEventListener("click", (event) => {
    if (event.target === deleteElectionModal) closeDeleteElectionModal();
  });

  confirmArchiveElection?.addEventListener("click", async () => {
    if (!selectedElectionForArchive) return;

    const election = selectedElectionForArchive;

    const electionName = archiveElectionName?.textContent.trim() || "Election";

    showActionLoading(
      "Archiving Election...",
      `Please wait while ${electionName} is being archived.`,
    );

    closeArchiveElectionModal();

    await new Promise((resolve) => setTimeout(resolve, 800));

    election.remove();

    hideActionLoading();

    showSuccessToast(
      "Election Archived",
      `${electionName} was successfully archived.`,
    );

    selectedElectionForArchive = null;
  });

  confirmDeleteElection?.addEventListener("click", async () => {
    if (!selectedElectionForDelete) return;

    const election = selectedElectionForDelete;

    const electionName = deleteElectionName?.textContent.trim() || "Election";

    showActionLoading(
      "Deleting Election...",
      `Please wait while ${electionName} is being deleted.`,
    );

    closeDeleteElectionModal();

    await new Promise((resolve) => setTimeout(resolve, 800));

    election.remove();

    hideActionLoading();

    showSuccessToast(
      "Election Deleted",
      `${electionName} was successfully deleted.`,
    );

    selectedElectionForDelete = null;
  });
}

function openDeleteElectionModal(electionItem) {
  if (!deleteElectionModal) {
    console.error("Delete election modal is not initialized.");
    return;
  }

  selectedElectionForDelete = electionItem;

  const title = electionItem.querySelector(".election-title span");
  if (deleteElectionName) {
    deleteElectionName.textContent = title
      ? title.textContent.trim()
      : "this election";
  }

  deleteElectionModal.classList.add("show");
}

function openArchiveElectionModal(electionItem) {
  if (!archiveElectionModal) {
    console.error("Archive election modal is not initialized.");
    return;
  }

  selectedElectionForArchive = electionItem;

  const title = electionItem.querySelector(".election-title span");
  if (archiveElectionName) {
    archiveElectionName.textContent = title
      ? title.textContent.trim()
      : "this election";
  }

  archiveElectionModal.classList.add("show");
}

function closeDeleteElectionModal() {
  if (!deleteElectionModal) return;
  deleteElectionModal.classList.remove("show");
  selectedElectionForDelete = null;
}

function closeArchiveElectionModal() {
  if (!archiveElectionModal) return;
  archiveElectionModal.classList.remove("show");
  selectedElectionForArchive = null;
}
