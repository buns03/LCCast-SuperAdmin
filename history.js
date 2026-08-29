/* ==========================================================
   LCCAST — HISTORY PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderHistorySampleData();

  initializeHistoryTabs();
  initializeHistoryFilters();
  initializeVoteAdvancedFilters();
  initializeHistorySearch();
  initializeHistoryExports();
  initializeHistoryPagination();
  initializeHistoryTrashActions();
  initializeHistoryModals();
  initializeArchiveFilterButton();
  initializeArchiveViewActions();
  initializeTrashEmptyButton();
  initializeHistoryToast();
  initializeActionDetailsRecordSearch();
});

/* ==========================================================
   SAMPLE DATA
========================================================== */

const HISTORY_SAMPLE_DATA = {
  voteLogs: [
    {
      voter: "Juan Dela Cruz",
      email: "juan.delacruz@example.com",
      initials: "JD",
      studentId: "2026-00001",
      referenceId: "VOTE-2026-000001",
      program: "BSIS",
      section: "A",
      year: "3rd Year",
      campus: "College",
      election: "SSC",
      electionName: "SSC Election 2026–2027",
      statusLabel: "Voted",
      time: "2026-08-16T09:12:00",
      dateTime: "August 16, 2026 · 9:12 AM",
    },
    {
      voter: "Maria Santos",
      email: "maria.santos@example.com",
      initials: "MS",
      studentId: "2026-00002",
      referenceId: "VOTE-2026-000002",
      program: "BSBA",
      section: "B",
      year: "2nd Year",
      campus: "CBAS",
      election: "Department",
      electionName: "Department Election 2026–2027",
      statusLabel: "Voted",
      time: "2026-08-16T10:25:00",
      dateTime: "August 16, 2026 · 10:25 AM",
    },
    {
      voter: "Pedro Reyes",
      email: "pedro.reyes@example.com",
      initials: "PR",
      studentId: "2026-00003",
      referenceId: "VOTE-2026-000003",
      program: "BSA",
      section: "C",
      year: "1st Year",
      campus: "Muzon",
      election: "SSC",
      electionName: "SSC Election 2026–2027",
      statusLabel: "Voted",
      time: "2026-08-16T11:40:00",
      dateTime: "August 16, 2026 · 11:40 AM",
    },
  ],

  actions: [
    {
      initials: "JD",
      user: "Juan Dela Cruz",
      identifier: "2026-00001",
      role: "Student",
      roleClass: "student",
      action: "Login",
      actionClass: "login",
      icon: "bi-box-arrow-in-right",
      description: "User logged into the system.",
      details: [],
      dateTime: "August 16, 2026 · 8:45 AM",
    },
    {
      initials: "AS",
      user: "Admin Staff",
      identifier: "admin001",
      role: "Admin",
      roleClass: "admin",
      action: "Voters Imported",
      actionClass: "create",
      icon: "bi-upload",
      description: "Imported 3,248 voter records.",
      detailsType: "import",
      affectedCount: 3248,
      importSummary: {
        fileName: "students_2026.csv",
        totalRows: 3248,
        imported: 3221,
        skipped: 17,
        failed: 10,
      },
      dateTime: "August 16, 2026 · 4:18 PM",
    },
    {
      initials: "SA",
      user: "Superadmin",
      identifier: "superadmin",
      role: "Superadmin",
      roleClass: "superadmin",
      action: "Election Created",
      actionClass: "create",
      icon: "bi-plus-circle",
      description: "Created SSC Election 2026–2027.",
      details: [
        {
          target: "SSC Election 2026–2027",
          field: "Election",
          from: "—",
          to: "SSC Election 2026–2027",
        },
      ],
      dateTime: "August 14, 2026 · 10:30 AM",
    },
    {
      initials: "AS",
      user: "Admin Staff",
      identifier: "admin001",
      role: "Admin",
      roleClass: "admin",
      action: "Partylist Updated",
      actionClass: "update",
      icon: "bi-pencil-square",
      description:
        "Changed partylist name: Justin Faderanga → Jhon Vincent Faderanga.",
      details: [
        {
          target: "Partylist",
          field: "Partylist Name",
          from: "Justin Faderanga",
          to: "Jhon Vincent Faderanga",
        },
      ],
      dateTime: "August 16, 2026 · 1:42 PM",
    },
    {
      initials: "AS",
      user: "Admin Staff",
      identifier: "admin001",
      role: "Admin",
      roleClass: "admin",
      action: "Voters Updated",
      actionClass: "update",
      icon: "bi-people",
      description: "Updated 3 voter records.",
      details: [
        {
          target: "2026-00021 — Maria Santos",
          field: "Section",
          from: "BSBA-B",
          to: "BSBA-A",
        },
        {
          target: "2026-00022 — Pedro Reyes",
          field: "Year Level",
          from: "2nd Year",
          to: "3rd Year",
        },
        {
          target: "2026-00023 — Ana Cruz",
          field: "Campus",
          from: "Muzon",
          to: "College",
        },
      ],
      dateTime: "August 16, 2026 · 2:15 PM",
    },
    {
      initials: "SA",
      user: "Superadmin",
      identifier: "superadmin",
      role: "Superadmin",
      roleClass: "superadmin",
      action: "Department Updated",
      actionClass: "update",
      icon: "bi-pencil-square",
      description: "Updated BSIS department information.",
      details: [
        {
          target: "BSIS",
          field: "Department Name",
          from: "Bachelor of Science in Information Systems",
          to: "Bachelor of Science in Information Systems and Technology",
        },
        { target: "BSIS", field: "Campus", from: "College", to: "CBAS" },
      ],
      dateTime: "August 16, 2026 · 3:05 PM",
    },
  ],

  archives: [
    {
      title: "SSC Election 2025–2026",
      type: "Elections",
      typeLabel: "Election",
      status: "Archived",
      description: "Completed election archived for historical reference.",
      date: "Archived August 1, 2026",
      by: "By Superadmin",
      icon: "bi-calendar-event",
    },
    {
      title: "Student Records — 2025",
      type: "Students",
      typeLabel: "Students",
      status: "Archived",
      description:
        "Inactive student records preserved for historical reference.",
      date: "Archived July 30, 2026",
      by: "By Admin",
      icon: "bi-person",
    },
  ],

  trash: [
    {
      title: "Department Election 2025–2026",
      type: "Elections",
      typeLabel: "Election",
      description: "Deleted by Superadmin.",
      expiration: "24 days remaining",
      date: "Deleted August 10, 2026",
      by: "By Superadmin",
      icon: "bi-calendar-x",
    },
    {
      title: "Student Account",
      type: "Students",
      typeLabel: "Student",
      description: "Student account deleted by Admin.",
      expiration: "18 days remaining",
      date: "Deleted August 4, 2026",
      by: "By Admin",
      icon: "bi-person-x",
    },
  ],
};

function escapeActionDetailsHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ==========================================================
   TOAST
========================================================== */

let historyToastTimer = null;

function initializeHistoryToast() {
  const toast = document.getElementById("historySuccessToast");
  const closeButton = document.getElementById("historyToastClose");
  if (!toast) return;
  closeButton?.addEventListener("click", closeHistoryToast);
}

function showHistoryToast(
  title = "Success",
  message = "Action completed successfully.",
) {
  const toast = document.getElementById("historySuccessToast");
  if (!toast) return;

  const titleEl = document.getElementById("historyToastTitle");
  const messageEl = document.getElementById("historyToastMessage");
  if (titleEl) titleEl.textContent = title;
  if (messageEl) messageEl.textContent = message;

  toast.classList.add("show");
  clearTimeout(historyToastTimer);
  historyToastTimer = setTimeout(closeHistoryToast, 3500);
}

function closeHistoryToast() {
  const toast = document.getElementById("historySuccessToast");
  if (!toast) return;
  toast.classList.remove("show");
  clearTimeout(historyToastTimer);
}

/* ==========================================================
   ACTION LOADING MODAL
========================================================== */

function showHistoryActionLoading(
  title = "Processing...",
  message = "Please wait while we process your request.",
) {
  const modal = document.getElementById("actionLoadingModal");

  if (!modal) return;

  const titleElement = document.getElementById("actionLoadingTitle");
  const messageElement = document.getElementById("actionLoadingMessage");

  if (titleElement) {
    titleElement.textContent = title;
  }

  if (messageElement) {
    messageElement.textContent = message;
  }

  modal.classList.add("show");
  document.body.classList.add("modal-loading");
}

function hideHistoryActionLoading() {
  const modal = document.getElementById("actionLoadingModal");

  if (!modal) return;

  modal.classList.remove("show");
  document.body.classList.remove("modal-loading");
}

function runHistoryActionWithLoading(title, message, callback) {
    showHistoryActionLoading(title, message);

    setTimeout(() => {
        try {
            callback?.();
        } finally {
            hideHistoryActionLoading();
        }
    }, 500);
}

/* ==========================================================
   TABS
========================================================== */

function initializeHistoryTabs() {
  const tabs = document.querySelectorAll(".history-tab");
  const sections = document.querySelectorAll(".history-section");
  if (!tabs.length || !sections.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      tabs.forEach((item) => item.classList.remove("active"));
      sections.forEach((section) => section.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.section)?.classList.add("active");
    });
  });
}

/* ==========================================================
   FILTERS
========================================================== */

const VOTE_ADVANCED_FILTER_IDS = [
  "voteProgramFilter",
  "voteSectionFilter",
  "voteYearLevelFilter",
  "voteCampusFilter",
  "voteSortFilter",
];

function initializeHistoryFilters() {
  document.querySelectorAll(".history-filter").forEach((filter) => {
    filter.addEventListener("change", () => {
      const section = filter.closest(".history-section");
      if (!section) return;

      // Vote Logs advanced filters apply via the Apply button instead.
      if (
        section.id === "voteLogs" &&
        VOTE_ADVANCED_FILTER_IDS.includes(filter.id)
      )
        return;

      applyHistoryFilters(section);
    });
  });
}

function initializeVoteAdvancedFilters() {
  const button = document.getElementById("voteAdvancedFilterBtn");
  const dropdown = document.getElementById("voteAdvancedFilterDropdown");
  const closeButton = document.getElementById("closeVoteFilters");
  const clearButton = document.getElementById("clearVoteFilters");
  const applyButton = document.getElementById("applyVoteFilters");
  const section = document.getElementById("voteLogs");
  if (!button || !dropdown || !section) return;

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle("show");
    button.classList.toggle("active", dropdown.classList.contains("show"));
  });

  closeButton?.addEventListener("click", closeVoteFilterDropdown);

  section
    .querySelectorAll(VOTE_ADVANCED_FILTER_IDS.map((id) => `#${id}`).join(", "))
    .forEach((filter) =>
      filter.addEventListener("change", updateVoteFilterCount),
    );

  applyButton?.addEventListener("click", () => {
    applyHistoryFilters(section);
    updateVoteFilterCount();
    closeVoteFilterDropdown();
  });

  clearButton?.addEventListener("click", () => {
    section.querySelectorAll(".history-filter").forEach((filter) => {
      if (VOTE_ADVANCED_FILTER_IDS.includes(filter.id)) filter.value = "";
    });
    applyHistoryFilters(section);
    updateVoteFilterCount();
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
      closeVoteFilterDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeVoteFilterDropdown();
  });

  updateVoteFilterCount();
}

function closeVoteFilterDropdown() {
  document
    .getElementById("voteAdvancedFilterDropdown")
    ?.classList.remove("show");
  document.getElementById("voteAdvancedFilterBtn")?.classList.remove("active");
}

function updateVoteFilterCount() {
  const countElement = document.getElementById("voteFilterCount");
  if (!document.getElementById("voteLogs") || !countElement) return;

  const count = VOTE_ADVANCED_FILTER_IDS.filter(
    (id) => document.getElementById(id)?.value,
  ).length;

  countElement.textContent = count;
  countElement.classList.toggle("visible", count > 0);
}

/* ==========================================================
   SEARCH
========================================================== */

function initializeHistorySearch() {
  ["voteLogSearch", "actionSearch", "archiveSearch", "trashSearch"].forEach(
    (id) => {
      const input = document.getElementById(id);
      input?.addEventListener("input", () =>
        applyHistoryFilters(input.closest(".history-section")),
      );
    },
  );
}

const HISTORY_SEARCH_INPUT_IDS = {
  voteLogs: "voteLogSearch",
  actions: "actionSearch",
  archives: "archiveSearch",
  trash: "trashSearch",
};

/* ==========================================================
   APPLY FILTERS
========================================================== */

function applyHistoryFilters(section) {
  if (!section) return;

  const rows = section.querySelectorAll(".history-row");
  if (!rows.length) return;

  const searchInputId = HISTORY_SEARCH_INPUT_IDS[section.id];
  const searchInput = searchInputId
    ? document.getElementById(searchInputId)
    : null;
  const search = searchInput ? searchInput.value.toLowerCase().trim() : "";

  const filters = section.querySelectorAll(".history-filter");

  rows.forEach((row) => {
    let visible = true;

    if (search && !row.textContent.toLowerCase().includes(search)) {
      visible = false;
    }

    filters.forEach((filter) => {
      if (!visible || !filter.value || filter.dataset.filter === "sort") return;

      const rowValue = row.dataset[filter.dataset.filter];
      if (rowValue && rowValue.toLowerCase() !== filter.value.toLowerCase()) {
        visible = false;
      }
    });

    row.dataset.historyFiltered = visible ? "true" : "false";
    row.style.display = visible ? "" : "none";
  });

  if (section.id === "voteLogs") sortVoteLogs();

  updateHistoryEmptyState(section);

  if (["voteLogs", "actions", "archives", "trash"].includes(section.id)) {
    historyPaginationState[section.id] = 1;
    renderHistoryPagination(section);
  }
}

function sortVoteLogs() {
  const sortFilter = document.getElementById("voteSortFilter");
  const tbody = document.getElementById("voteLogsTable");
  if (!sortFilter?.value || !tbody) return;

  const rows = [...tbody.querySelectorAll(".history-row")];
  const sort = sortFilter.value;

  rows.sort((a, b) => {
    if (sort === "az" || sort === "za") {
      const aName =
        a
          .querySelector(".history-user strong")
          ?.textContent.trim()
          .toLowerCase() || "";
      const bName =
        b
          .querySelector(".history-user strong")
          ?.textContent.trim()
          .toLowerCase() || "";
      return sort === "az"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    }

    if (sort === "time-up" || sort === "time-down") {
      const aTime = new Date(a.dataset.time).getTime();
      const bTime = new Date(b.dataset.time).getTime();
      return sort === "time-up" ? aTime - bTime : bTime - aTime;
    }

    return 0;
  });

  rows.forEach((row) => tbody.appendChild(row));
}

/* ==========================================================
   EMPTY STATE
========================================================== */

function updateHistoryEmptyState(section) {
  if (!section) return;

  const rows = section.querySelectorAll(".history-row");
  let emptyState = section.querySelector(".history-empty");
  const hasVisibleRows = [...rows].some((row) => row.style.display !== "none");

  if (hasVisibleRows) {
    if (emptyState) emptyState.style.display = "none";
    return;
  }

  if (!emptyState) {
    emptyState = document.createElement("div");
    emptyState.className = "history-empty";
    emptyState.innerHTML = `
            <div class="history-empty-icon"><i class="bi bi-inbox"></i></div>
            <h3>No records found</h3>
            <p>No records match your current search or filter.</p>
        `;

    const container =
      section.querySelector(".history-table-container") ||
      section.querySelector(".history-card-list");

    container?.appendChild(emptyState);
  }

  emptyState.style.display = "block";
}

/* ==========================================================
   EXPORT
========================================================== */

function initializeHistoryExports() {
  document
    .getElementById("exportVoteLogs")
    ?.addEventListener("click", () =>
      exportTableToCSV("voteLogsTable", "lccast-vote-logs.csv"),
    );

  document
    .getElementById("exportActions")
    ?.addEventListener("click", () =>
      exportTableToCSV("actionsTable", "lccast-actions.csv"),
    );
}

function exportTableToCSV(tableBodyId, filename) {
  const tbody = document.getElementById(tableBodyId);
  const table = tbody?.closest("table");
  if (!table) return;

  const csvField = (value) =>
    `"${value.replace(/\s+/g, " ").trim().replace(/"/g, '""')}"`;

  const headers = [...table.querySelectorAll("thead th")].map((th) =>
    csvField(th.textContent),
  );

  const rows = [...tbody.querySelectorAll("tr")]
    .filter((row) => row.style.display !== "none")
    .map((row) =>
      [...row.querySelectorAll("td")]
        .map((td) => csvField(td.textContent))
        .join(","),
    );

  if (!rows.length) {
    alert("There are no records to export.");
    return;
  }

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/* ==========================================================
   MODALS
========================================================== */

let historyDeleteCallback = null;
let historyRestoreCallback = null;

let currentActionDetails = [];
let currentActionDetailsPage = 1;
const ACTION_DETAILS_PAGE_SIZE = 5;

function initializeHistoryModals() {
  initializeActionDetailsModal();

  const deleteModal = document.getElementById("historyDeleteModal");
  const restoreModal = document.getElementById("historyRestoreModal");

  document
    .getElementById("historyDeleteCancel")
    ?.addEventListener("click", closeHistoryDeleteModal);
  document.getElementById("historyDeleteConfirm")?.addEventListener("click", () => {
    const callback = historyDeleteCallback;

    closeHistoryDeleteModal();

    runHistoryActionWithLoading(
        "Deleting...",
        "Please wait while the record is being deleted.",
        callback
    );
});

  document
    .getElementById("historyRestoreCancel")
    ?.addEventListener("click", closeHistoryRestoreModal);
  document.getElementById("historyRestoreConfirm")?.addEventListener("click", () => {
    const callback = historyRestoreCallback;

    closeHistoryRestoreModal();

    runHistoryActionWithLoading(
        "Restoring...",
        "Please wait while the record is being restored.",
        callback
    );
});

  [deleteModal, restoreModal].forEach((modal) => {
    modal?.addEventListener("click", (event) => {
      if (event.target === modal) modal.classList.remove("show");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    closeHistoryDeleteModal();
    closeHistoryRestoreModal();
  });
}

/* ==========================================================
   ACTION DETAILS — RECORD SEARCH
========================================================== */

function initializeActionDetailsRecordSearch() {
  const searchInput = document.getElementById("actionDetailsRecordSearch");

  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    // Always go back to page 1 when searching
    currentActionDetailsPage = 1;

    renderActionDetailsRecords();
  });
}

function initializeActionDetailsModal() {
  const modal = document.getElementById("historyActionDetailsModal");

  if (!modal) return;

  /*
   * View Details buttons
   *
   * These buttons are created by renderActions().
   */
  document.querySelectorAll(".action-details-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const index = Number(button.dataset.actionIndex);

      const record = HISTORY_SAMPLE_DATA.actions[index];

      if (!record) return;

      openActionDetailsModal(record);
    });
  });

  /*
   * HEADER CLOSE BUTTON
   */
  document
    .getElementById("actionDetailsClose")
    ?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      closeActionDetailsModal();
    });

  /*
   * FOOTER CLOSE BUTTON
   */
  document
    .getElementById("actionDetailsCloseBtn")
    ?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      closeActionDetailsModal();
    });

  /*
   * SEARCH CLEAR BUTTON
   */
  document
    .getElementById("actionDetailsSearchClear")
    ?.addEventListener("click", (event) => {
      event.preventDefault();

      const searchInput = document.getElementById("actionDetailsRecordSearch");

      if (!searchInput) return;

      searchInput.value = "";

      currentActionDetailsPage = 1;

      renderActionDetailsRecords();

      searchInput.focus();
    });

  /*
   * CLOSE WHEN CLICKING THE OVERLAY
   */
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeActionDetailsModal();
    }
  });

  /*
   * CLOSE WITH ESCAPE
   */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeActionDetailsModal();
    }
  });
}
/* ==========================================================
   ACTION DETAILS MODAL
========================================================== */

function openActionDetailsModal(record) {
  const modal = document.getElementById("historyActionDetailsModal");

  if (!modal || !record) return;

  /*
   * TITLE
   */
  const title = document.getElementById("actionDetailsTitle");

  if (title) {
    title.textContent = record.action || "Action Details";
  }

  /*
   * SUBTITLE
   */
  const subtitle = document.getElementById("actionDetailsSubtitle");

  if (subtitle) {
    subtitle.textContent =
      record.description || "Review the records affected by this action.";
  }

  /*
   * SUMMARY
   */
  const summary = document.getElementById("actionDetailsSummary");

  if (summary) {
    const icon = record.icon || "bi-activity";

    const description = escapeActionDetailsHTML(
      record.description || "No description available.",
    );

    const user = escapeActionDetailsHTML(record.user || "Unknown user");

    const role = escapeActionDetailsHTML(record.role || "Unknown role");

    const dateTime = escapeActionDetailsHTML(record.dateTime || "Unknown date");

    summary.innerHTML = `

            <div class="action-details-summary-icon">

                <i class="bi ${icon}"></i>

            </div>

            <div class="action-details-summary-info">

                <strong>
                    ${description}
                </strong>

                <div class="action-details-summary-meta">

                    <span>
                        <i class="bi bi-person"></i>
                        ${user}
                    </span>

                    <span>
                        <i class="bi bi-shield"></i>
                        ${role}
                    </span>

                    <span>
                        <i class="bi bi-clock"></i>
                        ${dateTime}
                    </span>

                </div>

            </div>

        `;
  }

  /*
   * AFFECTED RECORDS
   */
  currentActionDetails = Array.isArray(record.details) ? record.details : [];

  currentActionDetailsPage = 1;

  /*
   * RESET SEARCH
   */
  const recordSearch = document.getElementById("actionDetailsRecordSearch");

  if (recordSearch) {
    recordSearch.value = "";
  }

  /*
   * RENDER RECORDS
   */
  renderActionDetailsRecords();

  /*
   * OPEN MODAL
   */
  modal.classList.add("show");

  document.body.classList.add("modal-open");
}

function renderActionDetailsRecords() {
  const list = document.getElementById("actionDetailsRecordList");

  const count = document.getElementById("actionDetailsSearchCount");

  const pagination = document.getElementById("actionDetailsRecordPagination");

  const searchInput = document.getElementById("actionDetailsRecordSearch");

  if (!list) return;

  const search = searchInput ? searchInput.value.toLowerCase().trim() : "";

  /*
   * FILTER RECORDS
   */
  const filtered = currentActionDetails.filter((record) => {
    if (!search) return true;

    return [record.target, record.field, record.from, record.to]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(search));
  });

  /*
   * UPDATE COUNT
   */
  if (count) {
    count.textContent = `${filtered.length} ${
      filtered.length === 1 ? "record" : "records"
    }`;
  }

  /*
   * EMPTY STATE
   */
  if (!filtered.length) {
    list.innerHTML = `

            <div class="action-details-record-empty">

                <div class="action-details-record-empty-icon">
                    <i class="bi bi-search"></i>
                </div>

                <strong>
                    No affected records found
                </strong>

                <span>
                    Try searching by name, ID, or changed value.
                </span>

            </div>

        `;

    if (pagination) {
      pagination.innerHTML = "";
    }

    return;
  }

  /*
   * PAGINATION
   */
  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ACTION_DETAILS_PAGE_SIZE),
  );

  if (currentActionDetailsPage > totalPages) {
    currentActionDetailsPage = totalPages;
  }

  const startIndex = (currentActionDetailsPage - 1) * ACTION_DETAILS_PAGE_SIZE;

  const pageRecords = filtered.slice(
    startIndex,
    startIndex + ACTION_DETAILS_PAGE_SIZE,
  );

  /*
   * RENDER RECORDS
   */
  list.innerHTML = pageRecords
    .map((record) => {
      const target = escapeActionDetailsHTML(record.target || "Unknown record");

      const field = escapeActionDetailsHTML(record.field || "Changed field");

      const from = escapeActionDetailsHTML(record.from ?? "—");

      const to = escapeActionDetailsHTML(record.to ?? "—");

      return `

                <div class="action-details-record-item">

                    <div class="action-details-record-icon">

                        <i class="bi bi-person"></i>

                    </div>


                    <div class="action-details-record-info">

                        <strong>
                            ${target}
                        </strong>

                        <span>
                            ${field}
                        </span>

                    </div>


                    <div class="action-details-record-change">

                        <span class="action-details-record-old">
                            ${from}
                        </span>

                        <i class="bi bi-arrow-right action-details-record-arrow"></i>

                        <strong class="action-details-record-new">
                            ${to}
                        </strong>

                    </div>

                </div>

            `;
    })
    .join("");

  /*
   * PAGINATION
   */
  if (!pagination) return;

  if (totalPages <= 1) {
    pagination.innerHTML = "";

    return;
  }

  pagination.innerHTML = `

        <button
            type="button"
            class="action-details-pagination-btn"
            data-page="previous"
            ${currentActionDetailsPage === 1 ? "disabled" : ""}
            aria-label="Previous page"
        >
            <i class="bi bi-chevron-left"></i>
        </button>


        <span>
            Page ${currentActionDetailsPage} / ${totalPages}
        </span>


        <button
            type="button"
            class="action-details-pagination-btn"
            data-page="next"
            ${currentActionDetailsPage === totalPages ? "disabled" : ""}
            aria-label="Next page"
        >
            <i class="bi bi-chevron-right"></i>
        </button>

    `;

  pagination
    .querySelector('[data-page="previous"]')
    ?.addEventListener("click", () => {
      if (currentActionDetailsPage <= 1) {
        return;
      }

      currentActionDetailsPage--;

      renderActionDetailsRecords();
    });

  pagination
    .querySelector('[data-page="next"]')
    ?.addEventListener("click", () => {
      if (currentActionDetailsPage >= totalPages) {
        return;
      }

      currentActionDetailsPage++;

      renderActionDetailsRecords();
    });
}

function closeActionDetailsModal() {
  const modal = document.getElementById("historyActionDetailsModal");

  if (!modal) return;

  modal.classList.remove("show");

  document.body.classList.remove("modal-open");
}

/* ==========================================================
   DELETE / RESTORE MODALS
========================================================== */

function openHistoryDeleteModal(title, message, callback) {
  const modal = document.getElementById("historyDeleteModal");
  if (!modal) return;

  const titleEl = document.getElementById("historyDeleteModalTitle");
  const messageEl = document.getElementById("historyDeleteModalMessage");
  if (titleEl) titleEl.textContent = title || "Delete Record?";
  if (messageEl)
    messageEl.textContent =
      message || "Are you sure you want to delete this record?";

  historyDeleteCallback = callback || null;
  modal.classList.add("show");
}

function closeHistoryDeleteModal() {
  document.getElementById("historyDeleteModal")?.classList.remove("show");
  historyDeleteCallback = null;
}

function openHistoryRestoreModal(title, message, callback) {
  const modal = document.getElementById("historyRestoreModal");
  if (!modal) return;

  const titleEl = document.getElementById("historyRestoreModalTitle");
  const messageEl = document.getElementById("historyRestoreModalMessage");
  if (titleEl) titleEl.textContent = title || "Restore Record?";
  if (messageEl)
    messageEl.textContent =
      message || "Are you sure you want to restore this record?";

  historyRestoreCallback = callback || null;
  modal.classList.add("show");
}

function closeHistoryRestoreModal() {
  document.getElementById("historyRestoreModal")?.classList.remove("show");
  historyRestoreCallback = null;
}

/* ==========================================================
   RENDER SAMPLE DATA
========================================================== */

function renderHistorySampleData() {
  renderVoteLogs();
  renderActions();
  renderArchives();
  renderTrash();
}

function renderVoteLogs() {
  const tbody = document.getElementById("voteLogsTable");
  if (!tbody) return;

  tbody.innerHTML = HISTORY_SAMPLE_DATA.voteLogs
    .map(
      (record) => `
        <tr class="history-row" data-election="${record.election}" data-program="${record.program}"
            data-section="${record.section}" data-year="${record.year}" data-campus="${record.campus}"
            data-time="${record.time}" data-history-filtered="true">
            <td>
                <div class="history-user">
                    <div class="history-avatar">${record.initials}</div>
                    <div>
                        <strong>${record.voter}</strong>
                        <small>${record.email}</small>
                    </div>
                </div>
            </td>
            <td>${record.studentId}</td>
            <td>${record.referenceId}</td>
            <td>${record.program}</td>
            <td>${record.section}</td>
            <td>${record.year}</td>
            <td>${record.campus}</td>
            <td>${record.electionName}</td>
            <td>${record.dateTime}</td>
        </tr>
    `,
    )
    .join("");
}

function renderActions() {
  const tbody = document.getElementById("actionsTable");
  if (!tbody) return;

  tbody.innerHTML = HISTORY_SAMPLE_DATA.actions
    .map((record, index) => {
      const hasDetails =
        Array.isArray(record.details) && record.details.length > 0;

      return `
            <tr class="history-row" data-action="${record.action}" data-role="${record.role}" data-history-filtered="true">
                <td>
                    <div class="history-user">
                        <div class="history-avatar">${record.initials}</div>
                        <div>
                            <strong>${record.user}</strong>
                            <small>${record.identifier}</small>
                        </div>
                    </div>
                </td>
                <td><span class="role-badge ${record.roleClass}">${record.role}</span></td>
                <td>
                    <span class="action-badge ${record.actionClass}">
                        <i class="bi ${record.icon}"></i>
                        ${record.action}
                    </span>
                </td>
                <td><div class="action-description"><span>${record.description}</span></div></td>
                <td>${record.dateTime}</td>
                <td>
                    ${
                      hasDetails
                        ? `<button type="button" class="action-details-btn" data-action-index="${index}">
                                <i class="bi bi-eye"></i> View Details
                           </button>`
                        : `<span class="action-no-details">—</span>`
                    }
                </td>
            </tr>
        `;
    })
    .join("");
}

function renderArchives() {
  const container = document.getElementById("archivesList");
  if (!container) return;

  container.innerHTML = HISTORY_SAMPLE_DATA.archives
    .map(
      (record) => `
        <article class="history-card history-row" data-type="${record.type}" data-status="${record.status}" data-history-filtered="true">
            <div class="history-card-icon archive"><i class="bi ${record.icon}"></i></div>
            <div class="history-card-content">
                <div class="history-card-header">
                    <div>
                        <h3>${record.title}</h3>
                        <small>${record.typeLabel}</small>
                    </div>
                    <span class="archive-status">${record.status}</span>
                </div>
                <p>${record.description}</p>
                <div class="history-card-meta">
                    <span><i class="bi bi-calendar"></i> ${record.date}</span>
                    <span><i class="bi bi-person"></i> ${record.by}</span>
                </div>
            </div>
            <div class="history-card-actions">
                <button type="button" class="icon-btn view-archive"><i class="bi bi-eye"></i></button>
                <button type="button" class="icon-btn restore-archive"><i class="bi bi-arrow-counterclockwise"></i></button>
            </div>
        </article>
    `,
    )
    .join("");
}

function renderTrash() {
  const container = document.getElementById("trashList");
  if (!container) return;

  container.innerHTML = HISTORY_SAMPLE_DATA.trash
    .map(
      (record) => `
        <article class="history-card trash-card history-row" data-type="${record.type}" data-history-filtered="true">
            <div class="history-card-icon trash"><i class="bi ${record.icon}"></i></div>
            <div class="history-card-content">
                <div class="history-card-header">
                    <div>
                        <h3>${record.title}</h3>
                        <small>${record.typeLabel}</small>
                    </div>
                    <span class="trash-expiration"><i class="bi bi-clock"></i> ${record.expiration}</span>
                </div>
                <p>${record.description}</p>
                <div class="history-card-meta">
                    <span><i class="bi bi-trash3"></i> ${record.date}</span>
                    <span><i class="bi bi-person"></i> ${record.by}</span>
                </div>
            </div>
            <div class="history-card-actions">
                <button type="button" class="icon-btn restore-trash"><i class="bi bi-arrow-counterclockwise"></i></button>
                <button type="button" class="icon-btn permanent-delete"><i class="bi bi-trash3"></i></button>
            </div>
        </article>
    `,
    )
    .join("");
}

/* ==========================================================
   PAGINATION
========================================================== */

const HISTORY_PAGE_SIZE = 10;
const HISTORY_SECTION_IDS = ["voteLogs", "actions", "archives", "trash"];

const historyPaginationState = {
  voteLogs: 1,
  actions: 1,
  archives: 1,
  trash: 1,
};

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function initializeHistoryPagination() {
  HISTORY_SECTION_IDS.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const previousButton = document.getElementById(
      `previous${capitalize(sectionId)}Page`,
    );
    const nextButton = document.getElementById(
      `next${capitalize(sectionId)}Page`,
    );

    previousButton?.addEventListener("click", () => {
      if (historyPaginationState[sectionId] <= 1) return;
      historyPaginationState[sectionId]--;
      renderHistoryPagination(section);
    });

    nextButton?.addEventListener("click", () => {
      const totalPages = getHistoryTotalPages(section);
      if (historyPaginationState[sectionId] >= totalPages) return;
      historyPaginationState[sectionId]++;
      renderHistoryPagination(section);
    });

    renderHistoryPagination(section);
  });
}

function getHistoryPaginationRows(section) {
  if (!section) return [];
  return [...section.querySelectorAll(".history-row")].filter(
    (row) => row.dataset.historyFiltered !== "false",
  );
}

function getHistoryTotalPages(section) {
  return Math.max(
    1,
    Math.ceil(getHistoryPaginationRows(section).length / HISTORY_PAGE_SIZE),
  );
}

function renderHistoryPagination(section) {
  if (!section || !HISTORY_SECTION_IDS.includes(section.id)) return;

  const sectionId = section.id;
  const rows = getHistoryPaginationRows(section);
  const totalPages = Math.max(1, Math.ceil(rows.length / HISTORY_PAGE_SIZE));

  let currentPage = historyPaginationState[sectionId] || 1;
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  historyPaginationState[sectionId] = currentPage;

  // Hide every row, then reveal only the current page's slice.
  section.querySelectorAll(".history-row").forEach((row) => {
    row.style.display = "none";
  });

  const startIndex = (currentPage - 1) * HISTORY_PAGE_SIZE;
  rows.slice(startIndex, startIndex + HISTORY_PAGE_SIZE).forEach((row) => {
    row.style.display = "";
  });

  const paginationText = document.getElementById(`${sectionId}PaginationText`);
  if (paginationText)
    paginationText.textContent = `Page ${currentPage} / ${totalPages}`;

  const previousButton = document.getElementById(
    `previous${capitalize(sectionId)}Page`,
  );
  const nextButton = document.getElementById(
    `next${capitalize(sectionId)}Page`,
  );
  if (previousButton) previousButton.disabled = currentPage <= 1;
  if (nextButton) nextButton.disabled = currentPage >= totalPages;
}

/* ==========================================================
   ARCHIVE / TRASH ACTIONS
========================================================== */

function initializeHistoryTrashActions() {
  document.querySelectorAll(".restore-archive").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".history-card");
      if (!card) return;

      const name =
        card.querySelector("h3")?.textContent.trim() || "this archive";

      openHistoryRestoreModal(
        "Restore Archive?",
        `Are you sure you want to restore "${name}"?`,
        () => {
          card.remove();
          showHistoryToast(
            "Archive Restored",
            `"${name}" has been restored successfully.`,
          );
        },
      );
    });
  });

  document.querySelectorAll(".restore-trash").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".history-card");
      if (!card) return;

      const name =
        card.querySelector("h3")?.textContent.trim() || "this record";

      openHistoryRestoreModal(
        "Restore Record?",
        `Are you sure you want to restore "${name}"?`,
        () => {
          card.remove();
          updateHistoryEmptyState(document.getElementById("trash"));
          showHistoryToast(
            "Record Restored",
            `"${name}" has been restored successfully.`,
          );
        },
      );
    });
  });

  document.querySelectorAll(".permanent-delete").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".history-card");
      if (!card) return;

      const name =
        card.querySelector("h3")?.textContent.trim() || "this record";

      openHistoryDeleteModal(
        "Delete Permanently?",
        `Are you sure you want to permanently delete "${name}"? This action cannot be undone.`,
        () => {
          card.remove();
          updateHistoryEmptyState(document.getElementById("trash"));
          showHistoryToast(
            "Record Deleted",
            `"${name}" has been deleted successfully.`,
          );
        },
      );
    });
  });
}

/* ==========================================================
   ARCHIVE — CLEAR FILTERS
========================================================== */

function initializeArchiveFilterButton() {
  const button = document.getElementById("archiveFilterBtn");
  if (!button) return;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const section = document.getElementById("archives");
    if (!section) return;

    const search = document.getElementById("archiveSearch");
    if (search) search.value = "";

    section.querySelectorAll(".history-filter").forEach((filter) => {
      filter.value = "";
    });

    applyHistoryFilters(section);
    showHistoryToast(
      "Filters Cleared",
      "Archive filters have been cleared successfully.",
    );
  });
}

/* ==========================================================
   ARCHIVE — VIEW MODAL
========================================================== */

function initializeArchiveViewActions() {
  const modal = document.getElementById("historyArchiveViewModal");
  if (!modal) return;

  document.querySelectorAll(".view-archive").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const card = button.closest(".history-card");
      if (!card) return;

      const name =
        card.querySelector("h3")?.textContent.trim() || "Archived Record";
      const type =
        card.querySelector(".history-card-header small")?.textContent.trim() ||
        "Archive";
      const description =
        card.querySelector(".history-card-content > p")?.textContent.trim() ||
        "No description available.";

      const metadata = [
        ...card.querySelectorAll(".history-card-meta span"),
      ].map((item) => item.textContent.replace(/\s+/g, " ").trim());

      const archivedDate = metadata[0] || "Archive date unavailable";
      const archivedBy = metadata[1] || "Archived by unknown user";

      const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
      };

      setText("archiveViewTitle", name);
      setText("archiveViewType", type);
      setText("archiveViewDescription", description);
      setText("archiveViewDate", archivedDate.replace(/^Archived\s+/i, ""));
      setText("archiveViewBy", archivedBy.replace(/^By\s+/i, ""));

      modal.classList.add("show");
    });
  });

  document
    .getElementById("archiveViewClose")
    ?.addEventListener("click", closeArchiveViewModal);
  document
    .getElementById("archiveViewCloseBtn")
    ?.addEventListener("click", closeArchiveViewModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeArchiveViewModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show"))
      closeArchiveViewModal();
  });
}

function closeArchiveViewModal() {
  document.getElementById("historyArchiveViewModal")?.classList.remove("show");
}

/* ==========================================================
   EMPTY TRASH
========================================================== */

function initializeTrashEmptyButton() {
  const button = document.getElementById("emptyTrash");
  if (!button) return;

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const trash = document.getElementById("trash");
    if (!trash) return;

    const cards = trash.querySelectorAll(".trash-card");
    if (!cards.length) {
      alert("Trash is already empty.");
      return;
    }

    openHistoryDeleteModal(
      "Empty Trash?",
      "Are you sure you want to permanently delete all records in Trash? This action cannot be undone.",
      () => {
        cards.forEach((card) => card.remove());
        updateHistoryEmptyState(trash);
        showHistoryToast(
          "Trash Emptied",
          "All records in Trash have been permanently deleted.",
        );
      },
    );
  });
}

/* ==========================================================
   GLOBAL REFRESH
========================================================== */

function refreshHistory() {
  const activeSection = document.querySelector(".history-section.active");
  if (!activeSection) return;
  applyHistoryFilters(activeSection);
}

window.refreshHistory = refreshHistory;
