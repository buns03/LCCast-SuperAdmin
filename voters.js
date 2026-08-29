/* =========================================================
   LCCAST - VOTERS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", initializeVoters);

/* =========================================================
   SAMPLE VOTER DATA
========================================================= */

const voters = [
  { id: "2023-0001", name: "Juan Dela Cruz", year: "3rd Year", program: "BSIS", section: "BSIS3A", campus: "College", email: "juandelacruz@gmail.com", status: "Voted", time: "2026-08-13T08:42:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0002", name: "Maria Santos", year: "3rd Year", program: "BSIS", section: "BSIS3B", campus: "Muzon", email: "mariasantos@gmail.com", status: "Not Voted", time: null, createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0003", name: "Pedro Reyes", year: "4th Year", program: "BSIT", section: "BSIT4A", campus: "CBAS", email: "pedroreyes@gmail.com", status: "Voted", time: "2026-08-13T08:25:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0004", name: "Anna Flores", year: "2nd Year", program: "BSED", section: "BSED2A", campus: "Francisco", email: "", status: "Voted", time: "2026-08-13T07:58:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0005", name: "Carlos Garcia", year: "1st Year", program: "BSIS", section: "BSIS1A", campus: "College", email: "", status: "Not Voted", time: null, createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0006", name: "Sofia Mendoza", year: "4th Year", program: "BEED", section: "BEED4A", campus: "College", email: "", status: "Voted", time: "2026-08-12T17:44:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0007", name: "Miguel Ramos", year: "3rd Year", program: "BSIT", section: "BSIT3A", campus: "Muzon", email: "", status: "Not Voted", time: null, createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0008", name: "Andrea Torres", year: "2nd Year", program: "BSIS", section: "BSIS2A", campus: "CBAS", email: "", status: "Voted", time: "2026-08-12T16:21:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0009", name: "Daniel Navarro", year: "4th Year", program: "BSIS", section: "BSIS4A", campus: "Francisco", email: "", status: "Not Voted", time: null, createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0010", name: "Beatrice Cruz", year: "1st Year", program: "BSED", section: "BSED1A", campus: "College", email: "", status: "Voted", time: "2026-08-12T15:09:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0011", name: "Gabriel Santos", year: "3rd Year", program: "BSIT", section: "BSIT3B", campus: "Muzon", email: "", status: "Voted", time: "2026-08-12T14:42:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0012", name: "Nicole Garcia", year: "2nd Year", program: "BEED", section: "BEED2A", campus: "CBAS", email: "", status: "Not Voted", time: null, createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0013", name: "Joshua Reyes", year: "4th Year", program: "BSIS", section: "BSIS4B", campus: "Francisco", email: "", status: "Voted", time: "2026-08-12T13:17:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0014", name: "Camille Flores", year: "1st Year", program: "BSIT", section: "BSIT1A", campus: "College", email: "", status: "Not Voted", time: null, createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0015", name: "Nathan Villanueva", year: "3rd Year", program: "BSIS", section: "BSIS3A", campus: "Muzon", email: "", status: "Voted", time: "2026-08-12T12:04:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0016", name: "Angela Ramos", year: "4th Year", program: "BSED", section: "BSED4A", campus: "Francisco", email: "", status: "Voted", time: "2026-08-12T11:46:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0017", name: "Mark Fernandez", year: "2nd Year", program: "BSIT", section: "BSIT2A", campus: "College", email: "", status: "Not Voted", time: null, createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
  { id: "2023-0018", name: "Isabella Navarro", year: "3rd Year", program: "BEED", section: "BEED3A", campus: "CBAS", email: "", status: "Voted", time: "2026-08-12T10:38:00", createdOn: "2026-08-01T08:00:00", updatedOn: "2026-08-01T08:00:00", archived: false },
];

/* =========================================================
   STATE
========================================================= */

const FILTER_TYPES = ["status", "year", "program", "section", "campus"];

const voterState = {
  search: "",
  status: [], year: [], program: [], section: [], campus: [],
  nameSort: "default",
  timeSort: "default",
  page: 1,
  perPage: 10,
  pendingDeleteId: null,
  pendingArchiveId: null,
  pendingDeleteAll: false,
  pendingArchiveAll: false,
  pendingEditId: null,
};

/* =========================================================
   SMALL HELPERS
========================================================= */

const $ = (id) => document.getElementById(id);

function escapeHTML(value) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return String(value).replace(/[&<>"']/g, (ch) => map[ch]);
}

function formatDateTime(value) {
  return new Date(value).toLocaleString("en-PH", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
}

/** Wires backdrop-click + Escape to close a modal. */
function wireModalDismiss(modal, closeFn) {
  if (!modal) return;
  modal.addEventListener("click", (e) => { if (e.target === modal) closeFn(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) closeFn();
  });
}

/* =========================================================
   INITIALIZE
========================================================= */

function initializeVoters() {
  initializeStatusModal();
  initializeEditModal();
  initializeDeleteModal();
  initializeArchiveModal();
  initializeSuccessToast();
  initializeActionLoadingModal();
  initializeSearch();
  initializeFiltersPanel();
  populateMultiSectionFilter();
  initializePagination();
  initializeExport();
  initializeImport();
  initializeDeleteAndArchive();
  renderVoters();
}

/* =========================================================
   SUCCESS TOAST
========================================================= */

function initializeSuccessToast() {
  if (!$("successToast")) return;
  $("successToastClose")?.addEventListener("click", hideSuccessToast);
}

function showSuccessToast(title, message) {
  const toast = $("successToast");
  if (!toast || !$("successToastTitle") || !$("successToastMessage")) return;

  $("successToastTitle").textContent = title;
  $("successToastMessage").textContent = message;
  toast.classList.add("show");

  clearTimeout(window.successToastTimer);
  window.successToastTimer = setTimeout(hideSuccessToast, 3500);
}

function hideSuccessToast() {
  $("successToast")?.classList.remove("show");
}

/* =========================================================
   SEARCH + AUTOCOMPLETE
========================================================= */

function initializeSearch() {
  const input = $("voterSearch");
  const autocomplete = $("autocompleteList");
  if (!input || !autocomplete) return;

  input.addEventListener("input", () => {
    voterState.search = input.value.trim().toLowerCase();
    voterState.page = 1;
    renderAutocomplete();
    renderVoters();
  });

  input.addEventListener("focus", renderAutocomplete);

  document.addEventListener("click", (e) => {
    if (!input.parentElement.contains(e.target)) autocomplete.classList.remove("show");
  });
}

function renderAutocomplete() {
  const input = $("voterSearch");
  const list = $("autocompleteList");
  if (!input || !list) return;

  const query = input.value.trim().toLowerCase();
  const matches = query
    ? voters
        .filter((v) => [v.name, v.id, v.program].some((f) => f.toLowerCase().includes(query)))
        .slice(0, 6)
    : [];

  if (!matches.length) {
    list.innerHTML = "";
    list.classList.remove("show");
    return;
  }

  list.innerHTML = matches
    .map(
      (v) => `
        <button type="button" class="autocomplete-item" data-name="${escapeHTML(v.name)}">
            <strong>${escapeHTML(v.name)}</strong>
            <span>${escapeHTML(v.id)} &middot; ${escapeHTML(v.program)}</span>
        </button>`
    )
    .join("");

  list.classList.add("show");

  list.querySelectorAll(".autocomplete-item").forEach((item) => {
    item.addEventListener("click", () => {
      input.value = item.dataset.name;
      voterState.search = item.dataset.name.toLowerCase();
      voterState.page = 1;
      list.classList.remove("show");
      renderVoters();
    });
  });
}

/* =========================================================
   FILTER PANEL
========================================================= */

function initializeFiltersPanel() {
  const button = $("filtersMainButton");
  const panel = $("filtersPanel");
  if (!button || !panel) return;

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    panel.classList.toggle("show");
    button.classList.toggle("active", panel.classList.contains("show"));
  });

  $("filtersApplyBtn")?.addEventListener("click", () => {
    applySelectedFilters();
    voterState.page = 1;
    panel.classList.remove("show");
    button.classList.remove("active");
    renderVoters();
  });

  $("filtersClearBtn")?.addEventListener("click", clearAllFilters);

  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !button.contains(e.target)) {
      panel.classList.remove("show");
      button.classList.remove("active");
    }
  });

  panel.addEventListener("change", (e) => {
    // Program changes rebuild the Section list immediately.
    if (e.target.matches('input[data-filter-type="program"]')) {
      populateMultiSectionFilter();
      return;
    }
    updatePendingFilterCount();
  });
}

function applySelectedFilters() {
  const panel = $("filtersPanel");
  if (!panel) return;

  const newFilters = { status: [], year: [], program: [], section: [], campus: [], nameSort: "default", timeSort: "default" };

  panel.querySelectorAll('input[type="checkbox"]:checked').forEach((input) => {
    const type = input.dataset.filterType;
    if (newFilters[type]) newFilters[type].push(input.value);
  });

  // Keep only sections that still belong to the selected programs.
  if (newFilters.program.length) {
    const validSections = new Set(
      voters.filter((v) => newFilters.program.includes(v.program)).map((v) => v.section).filter(Boolean)
    );
    newFilters.section = newFilters.section.filter((s) => validSections.has(s));
  }

  newFilters.nameSort = panel.querySelector('input[name="nameSort"]:checked')?.value || "default";
  newFilters.timeSort = panel.querySelector('input[name="timeSort"]:checked')?.value || "default";

  Object.assign(voterState, newFilters);
  updateFilterCount();
}

function getSelectedFilterCount() {
  let count = FILTER_TYPES.reduce((sum, type) => sum + voterState[type].length, 0);
  if (voterState.nameSort !== "default") count++;
  if (voterState.timeSort !== "default") count++;
  return count;
}

function updatePendingFilterCount() {
  const panel = $("filtersPanel");
  const selectedText = $("filtersSelectedCount");
  if (!panel || !selectedText) return;

  let count = FILTER_TYPES.reduce(
    (sum, type) => sum + panel.querySelectorAll(`input[data-filter-type="${type}"]:checked`).length,
    0
  );
  if (panel.querySelector('input[name="nameSort"]:checked')) count++;
  if (panel.querySelector('input[name="timeSort"]:checked')) count++;

  selectedText.textContent = `${count} selected`;
}

function updateFilterCount() {
  const count = getSelectedFilterCount();
  const label = $("filtersMainLabel");
  const selectedText = $("filtersSelectedCount");
  const button = $("filtersMainButton");

  if (label) label.textContent = count === 0 ? "Filter" : `Filter (${count})`;
  if (selectedText) selectedText.textContent = `${count} selected`;
  button?.classList.toggle("has-filters", count > 0);
}

function clearAllFilters() {
  const panel = $("filtersPanel");
  if (!panel) return;

  panel.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((input) => {
    input.checked = false;
  });

  FILTER_TYPES.forEach((type) => (voterState[type] = []));
  voterState.nameSort = "default";
  voterState.timeSort = "default";
  voterState.page = 1;

  updateFilterCount();
  renderVoters();
}

/* =========================================================
   PAGINATION
========================================================= */

function initializePagination() {
  $("previousPage")?.addEventListener("click", () => {
    if (voterState.page <= 1) return;
    voterState.page--;
    renderVoters();
  });

  $("nextPage")?.addEventListener("click", () => {
    if (voterState.page >= getTotalPages()) return;
    voterState.page++;
    renderVoters();
  });
}

function getTotalPages() {
  return Math.max(1, Math.ceil(getFilteredVoters().length / voterState.perPage));
}

function updatePagination(totalPages) {
  const previous = $("previousPage");
  const next = $("nextPage");

  if ($("paginationText")) $("paginationText").textContent = `Page ${voterState.page} / ${totalPages}`;
  if (previous) previous.disabled = voterState.page <= 1;
  if (next) next.disabled = voterState.page >= totalPages;
}

/* =========================================================
   FILTER + SORT DATA
========================================================= */

function getFilteredVoters() {
  let result = voters.filter((v) => !v.archived);

  if (voterState.search) {
    const search = voterState.search;
    result = result.filter((v) => [v.name, v.id, v.program].some((f) => f.toLowerCase().includes(search)));
  }

  FILTER_TYPES.forEach((type) => {
    if (voterState[type].length) result = result.filter((v) => voterState[type].includes(v[type]));
  });

  if (voterState.nameSort === "A-Z") result.sort((a, b) => a.name.localeCompare(b.name));
  if (voterState.nameSort === "Z-A") result.sort((a, b) => b.name.localeCompare(a.name));

  if (voterState.timeSort === "Oldest" || voterState.timeSort === "Newest") {
    const dir = voterState.timeSort === "Oldest" ? 1 : -1;
    result.sort((a, b) => {
      if (!a.time) return 1;
      if (!b.time) return -1;
      return dir * (new Date(a.time) - new Date(b.time));
    });
  }

  return result;
}

/* =========================================================
   RENDER VOTERS
========================================================= */

function renderVoters() {
  const list = $("voterList");
  const empty = $("votersEmpty");
  if (!list || !empty) return;

  const filtered = getFilteredVoters();
  const totalPages = Math.max(1, Math.ceil(filtered.length / voterState.perPage));
  if (voterState.page > totalPages) voterState.page = totalPages;

  const start = (voterState.page - 1) * voterState.perPage;
  const pageItems = filtered.slice(start, start + voterState.perPage);

  list.innerHTML = "";
  empty.classList.toggle("show", !pageItems.length);
  pageItems.forEach((voter) => list.appendChild(createVoterElement(voter)));

  updatePagination(totalPages);
}

const DETAIL_ROWS = [
  ["Program", (v) => v.program],
  ["Year", (v) => v.year],
  ["Section", (v) => v.section || "—"],
  ["Campus", (v) => v.campus || "—"],
  ["Email", (v) => v.email || "—"],
];

function createVoterElement(voter) {
  const article = document.createElement("article");
  article.className = "voter-item";

  const statusClass = voter.status === "Voted" ? "voted" : "not-voted";
  const time = voter.time ? formatDateTime(voter.time) : "—";

  const detailRows = DETAIL_ROWS.map(
    ([label, get]) => `
        <div class="voter-detail-row"><span>${label}</span><span>${escapeHTML(get(voter))}</span></div>`
  ).join("");

  article.innerHTML = `
    <div class="voter-summary">
      <div class="voter-summary-info">
        <span class="voter-id">${escapeHTML(voter.id)}</span>
        <span class="voter-divider">|</span>
        <strong class="voter-name">${escapeHTML(voter.name)}</strong>
      </div>
      <div class="voter-summary-status">
        <span class="voter-status ${statusClass}">${escapeHTML(voter.status)}</span>
      </div>
      <div class="voter-summary-actions">
        <button type="button" class="voter-action-btn edit" title="Edit voter" aria-label="Edit voter"><i class="bi bi-pencil"></i></button>
        <button type="button" class="voter-action-btn archive" title="Archive voter" aria-label="Archive voter"><i class="bi bi-archive"></i></button>
        <button type="button" class="voter-action-btn delete" title="Delete voter" aria-label="Delete voter"><i class="bi bi-trash3"></i></button>
        <button type="button" class="voter-action-btn expand" title="Expand card" aria-label="expand card"><i class="bi bi-chevron-down voter-summary-arrow"></i></button>
      </div>
    </div>
    <div class="voter-details">
      <div class="voter-details-inner">
        ${detailRows}
        <div class="voter-detail-row"><span>Voting Status</span><span class="voter-status ${statusClass}">${escapeHTML(voter.status)}</span></div>
        <div class="voter-detail-row"><span>Time Voted</span><span>${escapeHTML(time)}</span></div>
        <div class="voter-detail-row"><span>Created On</span><span>${voter.createdOn ? escapeHTML(formatDateTime(voter.createdOn)) : "—"}</span></div>
        <div class="voter-detail-row"><span>Updated On</span><span>${voter.updatedOn ? escapeHTML(formatDateTime(voter.updatedOn)) : "—"}</span></div>
      </div>
    </div>`;

  article.querySelector(".voter-summary").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleVoter(article);
    }
  });

  const bind = (selector, handler) =>
    article.querySelector(selector)?.addEventListener("click", (e) => {
      e.stopPropagation();
      handler();
    });

  bind(".voter-action-btn.edit", () => editVoter(voter.id));
  bind(".voter-action-btn.archive", () => archiveVoter(voter.id));
  bind(".voter-action-btn.delete", () => deleteVoter(voter.id));
  bind(".voter-action-btn.expand", () => toggleVoter(article));

  return article;
}

function toggleVoter(article) {
  const isExpanded = article.classList.contains("expanded");
  document.querySelectorAll(".voter-item.expanded").forEach((item) => item.classList.remove("expanded"));
  if (!isExpanded) article.classList.add("expanded");
}

/* =========================================================
   SECTION FILTER OPTIONS
========================================================= */

function getSelectedProgramsFromPanel() {
  const panel = $("filtersPanel");
  if (!panel) return [];
  return [...panel.querySelectorAll('input[data-filter-type="program"]:checked')].map((i) => i.value);
}

function populateMultiSectionFilter() {
  const container = $("multiSectionOptions");
  if (!container) return;

  const selectedPrograms = getSelectedProgramsFromPanel();
  const selectedSections = [...container.querySelectorAll('input[data-filter-type="section"]:checked')].map((i) => i.value);

  const pool = selectedPrograms.length ? voters.filter((v) => selectedPrograms.includes(v.program)) : voters;
  const sections = [...new Set(pool.map((v) => v.section).filter(Boolean))].sort((a, b) => a.localeCompare(b));

  container.innerHTML = "";
  sections.forEach((section) => {
    const label = document.createElement("label");
    label.className = "filter-check";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = section;
    input.dataset.filterType = "section";
    input.checked = selectedSections.includes(section);

    const span = document.createElement("span");
    span.textContent = section;

    label.append(input, span);
    container.appendChild(label);
  });

  voterState.section = selectedSections.filter((s) => sections.includes(s));
  updatePendingFilterCount();
}

/* =========================================================
   STATUS MODAL (generic info/success/error popup)
========================================================= */

function initializeStatusModal() {
  const modal = $("votersStatusModal");
  if (!modal) return;

  $("closeVotersStatusModal")?.addEventListener("click", closeVotersStatusModal);
  $("votersStatusOk")?.addEventListener("click", closeVotersStatusModal);
  wireModalDismiss(modal, closeVotersStatusModal);
}

function showVotersStatusModal(type, title, message) {
  const modal = $("votersStatusModal");
  const icon = $("votersStatusIcon");
  if (!modal || !$("votersStatusTitle") || !$("votersStatusMessage") || !icon) return;

  modal.classList.remove("success", "error");
  modal.classList.add(type, "show");
  $("votersStatusTitle").textContent = title;
  $("votersStatusMessage").textContent = message;
  icon.innerHTML = type === "success" ? `<i class="bi bi-check-lg"></i>` : `<i class="bi bi-x-lg"></i>`;
}

function closeVotersStatusModal() {
  $("votersStatusModal")?.classList.remove("show");
}

/* =========================================================
   EDIT MODAL
========================================================= */

const EDIT_FIELDS = ["Id", "Name", "Program", "Year", "Section", "Campus", "Email"];

function initializeEditModal() {
  const modal = $("editVoterModal");
  if (!modal) return;

  $("closeEditVoterModal")?.addEventListener("click", closeEditVoterModal);
  $("cancelEditVoter")?.addEventListener("click", closeEditVoterModal);
  $("saveEditVoter")?.addEventListener("click", saveEditedVoter);
  wireModalDismiss(modal, closeEditVoterModal);
}

function closeEditVoterModal() {
  $("editVoterModal")?.classList.remove("show");
  voterState.pendingEditId = null;
  clearEditVoterErrors();
}

function clearEditVoterErrors() {
  EDIT_FIELDS.forEach((field) => {
    $(`editVoter${field}`)?.classList.remove("error");
    const error = $(`editVoter${field}Error`);
    if (error) error.textContent = "";
  });
}

function showEditVoterError(field, message) {
  $(`editVoter${field}`)?.classList.add("error");
  const error = $(`editVoter${field}Error`);
  if (error) error.textContent = message;
}

function editVoter(id) {
  const voter = voters.find((v) => v.id === id);
  if (!voter) return;

  voterState.pendingEditId = id;
  clearEditVoterErrors();

  EDIT_FIELDS.forEach((field) => {
    const key = field.charAt(0).toLowerCase() + field.slice(1);
    $(`editVoter${field}`).value = voter[key] || "";
  });

  $("editVoterModal")?.classList.add("show");
}

function saveEditedVoter() {
  const originalId = voterState.pendingEditId;
  if (!originalId) return;

  const voter = voters.find((v) => v.id === originalId);
  if (!voter) return;

  clearEditVoterErrors();

  const values = {};
  EDIT_FIELDS.forEach((field) => {
    const key = field.charAt(0).toLowerCase() + field.slice(1);
    values[key] = $(`editVoter${field}`).value.trim();
  });

  let valid = true;
  const required = { Id: "Student ID", Name: "Full name", Program: "Course", Year: "Year level", Section: "Section", Campus: "Campus" };

  Object.entries(required).forEach(([field, label]) => {
    const key = field.charAt(0).toLowerCase() + field.slice(1);
    if (!values[key]) {
      showEditVoterError(field, `${label} is required.`);
      valid = false;
    }
  });

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    showEditVoterError("Email", "Please enter a valid email address.");
    valid = false;
  }

  if (voters.some((v) => v.id.toLowerCase() === values.id.toLowerCase() && v.id !== originalId)) {
    showEditVoterError("Id", "This Student ID is already registered.");
    valid = false;
  }

  if (!valid) return;

  window.showActionLoading("Saving Voter...", "Please wait while the voter information is being saved.");

  // setTimeout lets the loading modal render before the update runs.
  setTimeout(() => {
    Object.assign(voter, values, { updatedOn: new Date().toISOString() });

    populateMultiSectionFilter();
    voterState.page = 1;
    renderVoters();
    closeEditVoterModal();
    window.hideActionLoading();

    showSuccessToast("Voter Updated", `${voter.name}'s information was updated successfully.`);
  }, 150);
}

/* =========================================================
   DELETE MODAL
========================================================= */

function initializeDeleteModal() {
  const modal = $("deleteVoterModal");
  if (!modal) return;

  $("deleteVoterCancel")?.addEventListener("click", closeDeleteModal);

  $("deleteVoterConfirm")?.addEventListener("click", () => {
    if (voterState.pendingDeleteAll) {
      window.showActionLoading("Deleting Voters...", "Please wait while the selected voters are being deleted.");
      setTimeout(() => performDeleteVoter(null), 150);
      return;
    }

    if (!voterState.pendingDeleteId) return;
    window.showActionLoading("Deleting Voter...", "Please wait while the voter is being permanently deleted.");
    setTimeout(() => performDeleteVoter(voterState.pendingDeleteId), 150);
  });

  wireModalDismiss(modal, closeDeleteModal);
}

function closeDeleteModal() {
  $("deleteVoterModal")?.classList.remove("show");
  voterState.pendingDeleteId = null;
  voterState.pendingDeleteAll = false;
  if ($("deleteVoterTitle")) $("deleteVoterTitle").textContent = "Delete Voter?";
}

function deleteVoter(id) {
  const voter = voters.find((v) => v.id === id);
  if (!voter) return;

  voterState.pendingDeleteId = id;
  voterState.pendingDeleteAll = false;
  if ($("deleteVoterMessage")) {
    $("deleteVoterMessage").textContent = `Are you sure you want to permanently delete ${voter.name}? This action cannot be undone.`;
  }
  $("deleteVoterModal")?.classList.add("show");
}

function deleteAllVoters() {
  const activeVoters = getFilteredVoters();
  if (!activeVoters.length) {
    showSuccessToast("Delete Failed", "There are no active voters to delete.");
    return;
  }

  voterState.pendingDeleteId = null;
  voterState.pendingDeleteAll = true;
  if ($("deleteVoterMessage")) {
    $("deleteVoterMessage").textContent = `Are you sure you want to permanently delete all ${activeVoters.length} active voters? This action cannot be undone.`;
  }
  if ($("deleteVoterTitle")) $("deleteVoterTitle").textContent = "Delete All Voters?";
  $("deleteVoterModal")?.classList.add("show");
}

function performDeleteVoter(id) {
  if (voterState.pendingDeleteAll) {
    const activeVoters = getFilteredVoters();
    const deletedCount = activeVoters.length;

    activeVoters.forEach((voter) => {
      const index = voters.findIndex((v) => v.id === voter.id);
      if (index !== -1) voters.splice(index, 1);
    });

    voterState.page = 1;
    populateMultiSectionFilter();
    renderVoters();
    closeDeleteModal();
    window.hideActionLoading();
    showSuccessToast("Voters Deleted", `${deletedCount} voter(s) were deleted.`);
    return;
  }

  const index = voters.findIndex((v) => v.id === id);
  if (index === -1) {
    closeDeleteModal();
    window.hideActionLoading();
    return;
  }

  const voter = voters[index];
  voters.splice(index, 1);

  voterState.page = 1;
  populateMultiSectionFilter();
  renderVoters();
  closeDeleteModal();
  window.hideActionLoading();
  showSuccessToast("Voter Deleted", `${voter.name} was permanently deleted.`);
}

/* =========================================================
   ARCHIVE MODAL
========================================================= */

function initializeArchiveModal() {
  const modal = $("archiveVoterModal");
  if (!modal) return;

  $("archiveVoterCancel")?.addEventListener("click", closeArchiveModal);

  $("archiveVoterConfirm")?.addEventListener("click", () => {
    if (voterState.pendingArchiveAll) {
      window.showActionLoading("Archiving Voters...", "Please wait while the selected voters are being archived.");
      setTimeout(() => performArchiveVoter(null), 150);
      return;
    }

    if (!voterState.pendingArchiveId) return;
    window.showActionLoading("Archiving Voter...", "Please wait while the voter is being archived.");
    setTimeout(() => performArchiveVoter(voterState.pendingArchiveId), 150);
  });

  wireModalDismiss(modal, closeArchiveModal);
}

function closeArchiveModal() {
  $("archiveVoterModal")?.classList.remove("show");
  voterState.pendingArchiveId = null;
  voterState.pendingArchiveAll = false;
  if ($("archiveVoterTitle")) $("archiveVoterTitle").textContent = "Archive Voter?";
}

function archiveVoter(id) {
  const voter = voters.find((v) => v.id === id);
  if (!voter) return;

  voterState.pendingArchiveId = id;
  voterState.pendingArchiveAll = false;
  if ($("archiveVoterMessage")) $("archiveVoterMessage").textContent = `Are you sure you want to archive ${voter.name}?`;
  $("archiveVoterModal")?.classList.add("show");
}

function archiveAllVoters() {
  const activeVoters = getFilteredVoters();
  if (!activeVoters.length) {
    showSuccessToast("Archive Failed", "There are no active voters to archive.");
    return;
  }

  voterState.pendingArchiveId = null;
  voterState.pendingArchiveAll = true;
  if ($("archiveVoterMessage")) {
    $("archiveVoterMessage").textContent = `Are you sure you want to archive all ${activeVoters.length} active voters?`;
  }
  if ($("archiveVoterTitle")) $("archiveVoterTitle").textContent = "Archive All Voters?";
  $("archiveVoterModal")?.classList.add("show");
}

function performArchiveVoter(id) {
  const now = new Date().toISOString();

  if (voterState.pendingArchiveAll) {
    const activeVoters = voters.filter((v) => !v.archived);
    activeVoters.forEach((voter) => {
      voter.archived = true;
      voter.updatedOn = now;
    });

    voterState.page = 1;
    renderVoters();
    closeArchiveModal();
    window.hideActionLoading();
    showSuccessToast("Voters Archived", `${activeVoters.length} voter(s) were archived successfully.`);
    return;
  }

  const voter = voters.find((v) => v.id === id);
  if (!voter) {
    closeArchiveModal();
    window.hideActionLoading();
    return;
  }

  voter.archived = true;
  voter.updatedOn = now;

  voterState.page = 1;
  renderVoters();
  closeArchiveModal();
  window.hideActionLoading();
  showSuccessToast("Voter Archived", `${voter.name} was archived successfully.`);
}

function initializeDeleteAndArchive() {
  $("deleteAllVoters")?.addEventListener("click", deleteAllVoters);
  $("archiveAllVoters")?.addEventListener("click", archiveAllVoters);
}

/* =========================================================
   GLOBAL ACTION LOADING MODAL
========================================================= */

function initializeActionLoadingModal() {
  const modal = $("actionLoadingModal");
  const title = $("actionLoadingTitle");
  const message = $("actionLoadingMessage");
  if (!modal || !title || !message) return;

  window.showActionLoading = (loadingTitle, loadingMessage) => {
    title.textContent = loadingTitle || "Processing...";
    message.textContent = loadingMessage || "Please wait while your request is being processed.";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-loading");
  };

  window.hideActionLoading = () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-loading");
  };
}

/* =========================================================
   EXPORT
========================================================= */

function initializeExport() {
  $("exportVoters")?.addEventListener("click", () => {
    const data = getFilteredVoters();
    if (!data.length) {
      showVotersStatusModal("error", "Export Failed", "There are no voters to export.");
      return;
    }

    const headers = ["Student ID", "Full Name", "Course", "Year Level", "Section", "Campus", "Email", "Voting Status", "Time Voted"];
    const rows = data.map((v) => [
      v.id, v.name, v.program, v.year, v.section || "", v.campus || "", v.email || "", v.status, v.time ? formatDateTime(v.time) : "",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lccast-voters.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    showSuccessToast("Export Successful", `${data.length} voter(s) exported successfully.`);
  });
}

/* =========================================================
   IMPORT
========================================================= */

function initializeImport() {
  const button = $("importVoters");
  const input = $("voterFileInput");
  if (!button || !input) return;

  button.addEventListener("click", () => input.click());

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) importVoterFile(file);
    input.value = "";
  });
}

function importVoterFile(file) {
  window.showActionLoading("Importing Voters...", "Please wait while the voter file is being imported.");

  setTimeout(() => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(firstSheet, { defval: "" });
        const imported = rows.map(normalizeImportedVoter).filter(Boolean);

        if (!imported.length) {
          window.hideActionLoading();
          showVotersStatusModal("error", "Import Failed", "The selected file contains no data.");
          return;
        }

        mergeImportedVoters(imported);
        populateMultiSectionFilter();
        voterState.page = 1;
        renderVoters();
        window.hideActionLoading();
        showVotersStatusModal("success", "Import Successful", `${imported.length} student(s) imported successfully.`);
      } catch (error) {
        console.error(error);
        window.hideActionLoading();
        showVotersStatusModal("error", "Import Failed", "Unable to read the selected file. Please check the file format and try again.");
      }
    };

    reader.readAsArrayBuffer(file);
  }, 150);
}

function mergeImportedVoters(imported) {
  let added = 0;
  let updated = 0;

  imported.forEach((importedVoter) => {
    const existingIndex = voters.findIndex((v) => String(v.id).trim() === String(importedVoter.id).trim());

    if (existingIndex === -1) {
      voters.push(importedVoter);
      added++;
      return;
    }

    const existing = voters[existingIndex];
    const now = new Date().toISOString();

    // Preserve id, status, time, createdOn, archived — only update student info.
    ["name", "year", "program", "section", "campus", "email"].forEach((key) => {
      existing[key] = importedVoter[key] || existing[key];
    });
    existing.updatedOn = now;
    if (!existing.createdOn) existing.createdOn = now;
    if (typeof existing.archived !== "boolean") existing.archived = false;

    updated++;
  });

  return { added, updated };
}

function pickField(row, keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== "") return row[key];
  }
  return "";
}

function normalizeImportedVoter(row) {
  const id = pickField(row, ["Student ID", "student id", "ID", "id"]);

  const fullName = pickField(row, ["Name", "Full Name", "full name", "name"]);
  const lastName = pickField(row, ["Last Name", "last name", "Last", "last", "LName", "lname", "Surname", "surname"]);
  const firstName = pickField(row, ["First Name", "first name", "First", "first", "FName", "fname", "Given Name", "given name"]);
  const middleName = pickField(row, ["Middle Name", "middle name", "Middle", "middle", "MName", "mname", "Middle Initial", "middle initial"]);

  // Build the full name from parts (First + Middle + Last) if no combined name column was given.
  let name = String(fullName).trim();
  if (!name) {
    name = [firstName, middleName, lastName].map((v) => String(v).trim()).filter(Boolean).join(" ");
  }

  const year = pickField(row, ["Year Level", "Year", "year level", "year"]);
  const program = pickField(row, ["Course", "Program", "course", "program"]);
  const section = pickField(row, ["Section", "section"]);
  const campus = String(pickField(row, ["Campus", "campus"])).trim();
  const email = pickField(row, ["Email", "email"]);

  if (!id || !name) return null;

  const validCampuses = ["College", "CBAS", "Francisco", "Muzon"];
  if (campus && !validCampuses.includes(campus)) return null;

  const now = new Date().toISOString();

  return {
    id: String(id).trim(),
    name: String(name).trim(),
    year: String(year).trim(),
    program: String(program).trim(),
    section: String(section).trim(),
    campus,
    email: String(email).trim(),
    status: "Not Voted",
    time: null,
    createdOn: now,
    updatedOn: now,
    archived: false,
  };
}