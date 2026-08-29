/* ==========================================================
   LCCast Dashboard
========================================================== */

let liveChart;

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    setCurrentDate();

    setActiveSidebar();

    loadDashboardStatistics();

    initializeCampusSelector();

    initializeElectionTabs();

    initializeChart();

    initializeCampusChart();

});

/* ==========================================================
   CURRENT DATE
========================================================== */

function setCurrentDate() {

    const dateElement = document.getElementById("todayDate");

    if (!dateElement) return;

    const today = new Date();

    dateElement.textContent = today.toLocaleDateString("en-US", {

        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"

    });

}

/* ==========================================================
   ACTIVE SIDEBAR
========================================================== */

function setActiveSidebar() {

    const currentPath = window.location.pathname;

    document.querySelectorAll(".sidebar nav a").forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === currentPath) {

            link.classList.add("active");

        }

    });

}

/* ==========================================================
   DASHBOARD DATA
   (Replace with API later)
========================================================== */

function loadDashboardStatistics() {

    const dashboard = {

        totalVoters: 1520,

        totalVoted: 1238,

        activeElection: 2,

        totalCandidates: 46

    };

    dashboard.turnout = Math.round(

        (dashboard.totalVoted / dashboard.totalVoters) * 100

    );

    animateNumber(
        "totalVoters",
        dashboard.totalVoters
    );

    animateNumber(
        "totalVoted",
        dashboard.totalVoted
    );

    animateNumber(
        "activeElection",
        dashboard.activeElection
    );

    animateNumber(
        "totalCandidates",
        dashboard.totalCandidates
    );

    animateNumber(
        "turnout",
        dashboard.turnout,
        "%"
    );

}

/* =========================================================
   CAMPUS DATA
========================================================= */

const campusData = {

    all: {

        name: "All Campuses",

        description:
            "Overview of voting activity across all campuses."

    },

    college: {

        name: "College",

        description:
            "Voting activity for the College campus."

    },

    cbas: {

        name: "CBAS",

        description:
            "Voting activity for the CBAS campus."

    },

    muzon: {

        name: "Muzon",

        description:
            "Voting activity for the Muzon campus."

    },

    francisco: {

        name: "Francisco",

        description:
            "Voting activity for the Francisco campus."

    }

};



/* =========================================================
   COURSE DATA BY CAMPUS
========================================================= */

const courseVoteData = {

    all: {

        labels: [

            "BSIS",
            "BSHM",
            "BSCRIM",
            "BSPSYCH",
            "EDUC",
            "BSBA",
            "BAEL",
            "BSCE",
            "BSA",
            "BSAIS"

        ],

        data: [

            580,
            520,
            465,
            430,
            405,
            380,
            290,
            260,
            245,
            210

        ]

    },

    college: {

        labels: [

            "BSIS",
            "BSHM",
            "BSCRIM",
            "BSPSYCH",
            "EDUC",
            "BSBA",
            "BAEL",
            "BSCE",
            "BSA",
            "BSAIS"

        ],

        data: [

            290,
            240,
            215,
            190,
            175,
            210,
            135,
            120,
            145,
            110

        ]

    },

    cbas: {

        labels: [

            "BSIS",
            "BSHM",
            "BSCRIM",
            "BSPSYCH",
            "EDUC",
            "BSBA",
            "BAEL",
            "BSCE",
            "BSA",
            "BSAIS"

        ],

        data: [

            115,
            125,
            105,
            98,
            110,
            82,
            70,
            55,
            48,
            42

        ]

    },

    muzon: {

        labels: [

            "BSIS",
            "BSHM",
            "BSCRIM",
            "BSPSYCH",
            "EDUC",
            "BSBA",
            "BAEL",
            "BSCE",
            "BSA",
            "BSAIS"

        ],

        data: [

            98,
            85,
            80,
            75,
            68,
            55,
            50,
            45,
            32,
            30

        ]

    },

    francisco: {

        labels: [

            "BSIS",
            "BSHM",
            "BSCRIM",
            "BSPSYCH",
            "EDUC",
            "BSBA",
            "BAEL",
            "BSCE",
            "BSA",
            "BSAIS"

        ],

        data: [

            77,
            70,
            65,
            67,
            52,
            33,
            35,
            40,
            20,
            28

        ]

    }

};

/* =========================================================
   CHANGE CAMPUS
========================================================= */

function changeCampus(campus) {

    const campusTitle =
        document.getElementById("campusTitle");

    const campusDescription =
        document.getElementById("campusDescription");

    const allCampusContent =
        document.getElementById("allCampusContent");

    const singleCampusContent =
        document.getElementById("singleCampusContent");

    const yearLevelDescription =
        document.getElementById("yearLevelDescription");

    const courseDescription =
        document.getElementById("courseDescription");

    const selectedCampus =
        campusData[campus];

    if (!selectedCampus) return;


    campusTitle.textContent =
        selectedCampus.name;

    campusDescription.textContent =
        selectedCampus.description;


    if (campus === "all") {

        allCampusContent.classList.remove("hidden");

        singleCampusContent.classList.add("hidden");

        initializeCampusChart();

    } else {

        allCampusContent.classList.add("hidden");

        singleCampusContent.classList.remove("hidden");

        initializeSSCChart(campus);

        initializeDepartmentChart(campus);

    }

}

/* =========================================================
   ELECTION TABS
========================================================= */

function initializeElectionTabs() {

    const tabs =
        document.querySelectorAll(".election-tab");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            tabs.forEach(item => {

                item.classList.remove("active");

            });

            tab.classList.add("active");

            const election =
                tab.dataset.election;

            const sscContent =
                document.getElementById("sscContent");

            const departmentContent =
                document.getElementById("departmentContent");


            if (election === "ssc") {

                sscContent.classList.remove("hidden");

                departmentContent.classList.add("hidden");

            }

            else {

                sscContent.classList.add("hidden");

                departmentContent.classList.remove("hidden");

            }

        });

    });

}

/* =========================================================
   CAMPUS SELECTION
========================================================= */

function initializeCampusSelector() {

    const campusSelect =
        document.getElementById("campusSelect");

    if (!campusSelect) return;

    campusSelect.addEventListener("change", () => {

        changeCampus(campusSelect.value);

    });

}

/* ==========================================================
   COUNT ANIMATION
========================================================== */

function animateNumber(id, end, suffix = "", duration = 1000) {

    const element = document.getElementById(id);

    if (!element) return;

    let start = null;

    function step(timestamp) {

        if (!start) start = timestamp;

        const progress = Math.min((timestamp - start) / duration, 1);

        element.textContent =

            Math.floor(progress * end) + suffix;

        if (progress < 1) {

            requestAnimationFrame(step);

        }

    }

    requestAnimationFrame(step);

}

/* ==========================================================
   LIVE GRAPH
========================================================== */

function initializeChart() {

    const canvas = document.getElementById("liveGraph");

    if (!canvas) return;

    if (liveChart) {

        liveChart.destroy();

    }

    liveChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "BSIS",
                "BSA",
                "BSBA",
                "BSED",
                "BEED",
                "BSHM"

            ],

            datasets: [{

                label: "Votes",

                data: [

                    235,
                    198,
                    173,
                    156,
                    149,
                    127

                ],

                backgroundColor: "#5B5CEB",

                hoverBackgroundColor: "#494ADB",

                borderRadius: 10,

                borderSkipped: false,

                maxBarThickness: 42

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 900,

                easing: "easeOutQuart"

            },

            plugins: {

                legend: {

                    display: false

                },

                tooltip: {

                    backgroundColor: "#5B5CEB",

                    displayColors: false,

                    padding: 12,

                    cornerRadius: 10,

                    titleFont: {

                        family: "Poppins",

                        size: 14

                    },

                    bodyFont: {

                        family: "Poppins",

                        size: 13

                    }

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    },

                    ticks: {

                        color: "#64748B",

                        font: {

                            family: "Poppins",

                            size: 13

                        }

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        stepSize: 50,

                        color: "#64748B",

                        font: {

                            family: "Poppins",

                            size: 12

                        }

                    },

                    grid: {

                        color: "#E8EAF2",

                        drawBorder: false

                    }

                }

            }

        }

    });

}

/* =========================================================
   CAMPUS GRAPH
========================================================= */

let campusChart;

function initializeCampusChart() {

    const canvas =
        document.getElementById("campusGraph");

    if (!canvas) return;

    if (campusChart) {

        campusChart.destroy();

    }

    campusChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "College",
                "CBAS",
                "Muzon",
                "Francisco"

            ],

            datasets: [{

                label: "Votes",

                data: [

                    1238,
                    987,
                    756,
                    634

                ],

                backgroundColor: "#5B5CEB",

                hoverBackgroundColor: "#494ADB",

                borderRadius: 10,

                borderSkipped: false,

                maxBarThickness: 42

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        stepSize: 100

                    }

                }

            }

        }

    });

}


/* =========================================================
   SSC GRAPH
========================================================= */

let sscChart;

function initializeSSCChart(campus) {

    const canvas =
        document.getElementById("sscGraph");

    if (!canvas) return;

    if (sscChart) {

        sscChart.destroy();

    }

    const data = {

        college: [620, 580],

        cbas: [510, 465],

        muzon: [420, 380],

        francisco: [350, 310]

    };

    sscChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Voted",
                "Not Voted"

            ],

            datasets: [{

                label: "Voters",

                data: data[campus],

                backgroundColor: "#5B5CEB",

                borderRadius: 10,

                borderSkipped: false,

                maxBarThickness: 60

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    }

                },

                y: {

                    beginAtZero: true

                }

            }

        }

    });

}

/* =========================================================
   DEPARTMENT GRAPH
========================================================= */

/* =========================================================
   DEPARTMENT ELECTIONS GRAPH
   Uses the same course/program data as the department data
========================================================= */

let departmentChart;

function initializeDepartmentChart(campus) {

    const canvas =
        document.getElementById("departmentGraph");

    if (!canvas) return;

    if (departmentChart) {

        departmentChart.destroy();

    }

    const selectedData =
        courseVoteData[campus];

    if (!selectedData) return;

    departmentChart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: selectedData.labels,

            datasets: [{

                label: "Votes",

                data: selectedData.data,

                backgroundColor: [

                    "#5B5CEB",
                    "#22C55E",
                    "#F59E0B",
                    "#EF4444",
                    "#06B6D4",
                    "#8B5CF6",
                    "#EC4899",
                    "#14B8A6",
                    "#F97316",
                    "#64748B"

                ],

                hoverBackgroundColor: [

                    "#494ADB",
                    "#16A34A",
                    "#D97706",
                    "#DC2626",
                    "#0891B2",
                    "#7C3AED",
                    "#DB2777",
                    "#0D9488",
                    "#EA580C",
                    "#475569"

                ],

                borderRadius: 8,

                borderSkipped: false

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: {

                duration: 700,

                easing: "easeOutQuart"

            },

            plugins: {

                legend: {

                    display: false

                },

                tooltip: {

                    displayColors: false,

                    padding: 12,

                    cornerRadius: 10,

                    callbacks: {

                        label: function (context) {

                            return "Votes: " +
                                context.parsed.y;

                        }

                    }

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    },

                    ticks: {

                        color: "#64748B",

                        font: {

                            size: 12

                        }

                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#64748B",

                        stepSize: 50

                    },

                    grid: {

                        color: "#E8EAF2",

                        drawBorder: false

                    }

                }

            }

        }

    });

}

/* ==========================================================
   FUTURE API
========================================================== */

// async function loadDashboard() {
//
//     const response = await fetch("/api/dashboard");
//
//     const data = await response.json();
//
// }