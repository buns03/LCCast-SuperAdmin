/* =========================================================
   LCCAST - SETTINGS PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeSettingsTabs();

  initializeSettingsAccordions();

  renderAdmins();

  initializeAdminControls();

  initializeAdminSearch();

  initializeAdminFilters();

  initializeAdminPagination();

  initializePasswordToggles();

  initializeAdminForms();

  initializeElectionManagementFields();

  initializeSettingsModals();
});
let adminCurrentPage = 1;

const ADMIN_PER_PAGE = 10;

/* =========================================================
   SAMPLE ADMIN DATA
========================================================= */

const admins = [
  {
    id: 1,
    lastName: "Dela Cruz",
    firstName: "Juan",
    middleName: "Santos",
    contact: "09123456789",
    email: "juan.delacruz@email.com",
    campus: "College",
    electionType: "DEPARTMENT",
    department: "BSIS",
    password: "admin123",
    dateAssigned: "August 10, 2026",
    status: "Active",
    lastUpdated: "August 10, 2026",
  },

  {
    id: 2,
    lastName: "Santos",
    firstName: "Maria",
    middleName: "Reyes",
    contact: "09123456790",
    email: "maria.santos@email.com",
    campus: "CBAS",
    electionType: "DEPARTMENT",
    department: "BAEL",
    password: "admin123",
    dateAssigned: "August 11, 2026",
    status: "Active",
    lastUpdated: "August 11, 2026",
  },

  {
    id: 3,
    lastName: "Reyes",
    firstName: "Pedro",
    middleName: "Garcia",
    contact: "09123456791",
    email: "pedro.reyes@email.com",
    campus: "Muzon",
    electionType: "DEPARTMENT",
    department: "BSIS",
    password: "admin123",
    dateAssigned: "August 12, 2026",
    status: "Active",
    lastUpdated: "August 12, 2026",
  },

  {
    id: 4,
    lastName: "Garcia",
    firstName: "Ana",
    middleName: "Lopez",
    contact: "09123456792",
    email: "ana.garcia@email.com",
    campus: "Francisco",
    electionType: "DEPARTMENT",
    department: "BSHM",
    password: "admin123",
    dateAssigned: "August 12, 2026",
    status: "Active",
    lastUpdated: "August 13, 2026",
  },

  {
    id: 5,
    lastName: "Lopez",
    firstName: "Carlos",
    middleName: "Mendoza",
    contact: "09123456793",
    email: "carlos.lopez@email.com",
    campus: "College",
    electionType: "DEPARTMENT",
    department: "BSA",
    password: "admin123",
    dateAssigned: "August 13, 2026",
    status: "Active",
    lastUpdated: "August 13, 2026",
  },

  {
    id: 6,
    lastName: "Mendoza",
    firstName: "Sofia",
    middleName: "Ramos",
    contact: "09123456794",
    email: "sofia.mendoza@email.com",
    campus: "CBAS",
    electionType: "DEPARTMENT",
    department: "BSPSY",
    password: "admin123",
    dateAssigned: "August 13, 2026",
    status: "Active",
    lastUpdated: "August 14, 2026",
  },

  {
    id: 7,
    lastName: "Ramos",
    firstName: "Daniel",
    middleName: "Torres",
    contact: "09123456795",
    email: "daniel.ramos@email.com",
    campus: "Muzon",
    electionType: "DEPARTMENT",
    department: "BSCRIM",
    password: "admin123",
    dateAssigned: "August 14, 2026",
    status: "Active",
    lastUpdated: "August 14, 2026",
  },

  {
    id: 8,
    lastName: "Torres",
    firstName: "Angela",
    middleName: "Flores",
    contact: "09123456796",
    email: "angela.torres@email.com",
    campus: "Francisco",
    electionType: "SSC",
    department: "",
    password: "admin123",
    dateAssigned: "August 14, 2026",
    status: "Active",
    lastUpdated: "August 15, 2026",
  },

  {
    id: 9,
    lastName: "Flores",
    firstName: "Michael",
    middleName: "Navarro",
    contact: "09123456797",
    email: "michael.flores@email.com",
    campus: "College",
    electionType: "DEPARTMENT",
    department: "BSBA",
    password: "admin123",
    dateAssigned: "August 15, 2026",
    status: "Active",
    lastUpdated: "August 15, 2026",
  },

  {
    id: 10,
    lastName: "Navarro",
    firstName: "Christine",
    middleName: "Aquino",
    contact: "09123456798",
    email: "christine.navarro@email.com",
    campus: "CBAS",
    electionType: "DEPARTMENT",
    department: "BSIS",
    password: "admin123",
    dateAssigned: "August 15, 2026",
    status: "Active",
    lastUpdated: "August 16, 2026",
  },

  {
    id: 11,
    lastName: "Aquino",
    firstName: "Mark",
    middleName: "Rivera",
    contact: "09123456799",
    email: "mark.aquino@email.com",
    campus: "Muzon",
    electionType: "DEPARTMENT",
    department: "BSIS",
    password: "admin123",
    dateAssigned: "August 16, 2026",
    status: "Active",
    lastUpdated: "August 16, 2026",
  },

  {
    id: 12,
    lastName: "Rivera",
    firstName: "Patricia",
    middleName: "Castillo",
    contact: "09123456800",
    email: "patricia.rivera@email.com",
    campus: "Francisco",
    electionType: "DEPARTMENT",
    department: "BSPSY",
    password: "admin123",
    dateAssigned: "August 16, 2026",
    status: "Active",
    lastUpdated: "August 17, 2026",
  },

  {
    id: 13,
    lastName: "Castillo",
    firstName: "John",
    middleName: "Fernandez",
    contact: "09123456801",
    email: "john.castillo@email.com",
    campus: "College",
    electionType: "DEPARTMENT",
    department: "BSCE",
    password: "admin123",
    dateAssigned: "August 17, 2026",
    status: "Active",
    lastUpdated: "August 17, 2026",
  },

  {
    id: 14,
    lastName: "Fernandez",
    firstName: "Nicole",
    middleName: "Villanueva",
    contact: "09123456802",
    email: "nicole.fernandez@email.com",
    campus: "CBAS",
    electionType: "DEPARTMENT",
    department: "BSHM",
    password: "admin123",
    dateAssigned: "August 17, 2026",
    status: "Active",
    lastUpdated: "August 18, 2026",
  },

  {
    id: 15,
    lastName: "Villanueva",
    firstName: "James",
    middleName: "Morales",
    contact: "09123456803",
    email: "james.villanueva@email.com",
    campus: "Muzon",
    electionType: "DEPARTMENT",
    department: "BSIS",
    password: "admin123",
    dateAssigned: "August 18, 2026",
    status: "Active",
    lastUpdated: "August 18, 2026",
  },
];

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   RENDER EXISTING ADMINS
========================================================= */

function renderAdmins() {
  const adminList = document.getElementById("adminList");

  if (!adminList) return;

  adminList.innerHTML = admins
    .map((admin) => {
      const fullName = `${admin.firstName} ${admin.middleName ? admin.middleName + " " : ""}${admin.lastName}`;

      const initials = `${admin.firstName.charAt(0)}${admin.lastName.charAt(0)}`;

      return `

            <article
                class="admin-item"
                data-id="${admin.id}"
                data-name="${escapeHTML(fullName)}"
                data-email="${escapeHTML(admin.email)}"
                data-campus="${escapeHTML(admin.campus)}"
                data-election-type="${escapeHTML(admin.electionType)}"
                data-department="${escapeHTML(admin.department)}"
                data-pagination-hidden="false"
            >

                <div class="admin-item-header">

                    <div class="admin-summary">

                        <div class="admin-avatar">
                            ${escapeHTML(initials)}
                        </div>


                        <div>

                            <h3>
                                ${escapeHTML(fullName)}
                            </h3>

                            <span>
                                ${escapeHTML(admin.email)}
                            </span>

                            <span class="admin-campus">

                                <i class="bi bi-building"></i>

                                ${escapeHTML(admin.campus)}

                            </span>

                            <span class="admin-election-type">

                                <i class="bi bi-check2-square"></i>

                                ${
                                  admin.electionType === "SSC"
                                    ? "SSC Election"
                                    : "Department Election"
                                }

                            </span>


                            ${
                              admin.electionType === "DEPARTMENT"
                                ? `
                                        <span class="admin-department">

                                            <i class="bi bi-diagram-3"></i>

                                            ${escapeHTML(admin.department || "—")}

                                        </span>
                                    `
                                : ""
                            }

                        </div>

                    </div>


                    <div class="admin-controls">

                        <button
                            type="button"
                            class="admin-icon edit-admin"
                            title="Edit Admin"
                        >
                            <i class="bi bi-pencil"></i>
                        </button>


                        <button
                            type="button"
                            class="admin-icon archive-admin"
                            title="Archive Admin"
                        >
                            <i class="bi bi-archive"></i>
                        </button>


                        <button
                            type="button"
                            class="admin-icon delete-admin"
                            title="Delete Admin"
                        >
                            <i class="bi bi-trash"></i>
                        </button>


                        <button
                            type="button"
                            class="admin-icon expand-admin"
                            title="View Admin"
                        >
                            <i class="bi bi-chevron-down"></i>
                        </button>

                    </div>

                </div>


                <div class="admin-details">

                    <!-- VIEW DETAILS -->

                    <div class="admin-view-details">

                        <div class="admin-view-row">

                            <span>Contact Number</span>

                            <span>
                                ${escapeHTML(admin.contact || "—")}
                            </span>

                        </div>


                        <div class="admin-view-row">

                            <span>Date Assigned</span>

                            <span>
                                ${escapeHTML(admin.dateAssigned || "—")}
                            </span>

                        </div>


                        <div class="admin-view-row">

                            <span>Status</span>

                            <span>
                                ${escapeHTML(admin.status || "—")}
                            </span>

                        </div>


                        <div class="admin-view-row">

                            <span>Last Updated</span>

                            <span>
                                ${escapeHTML(admin.lastUpdated || "—")}
                            </span>

                        </div>

                    </div>


                    <!-- EDIT FORM -->

                    <form
                        class="edit-admin-form"
                        novalidate
                    >

                        <div class="form-grid admin-name-grid">


                            <div class="form-group">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    value="${escapeHTML(admin.lastName)}"
                                    required
                                >

                                <small class="field-error">
                                    This field is required.
                                </small>

                            </div>


                            <div class="form-group">

                                <label>
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    value="${escapeHTML(admin.firstName)}"
                                    required
                                >

                                <small class="field-error">
                                    This field is required.
                                </small>

                            </div>


                            <div class="form-group">

                                <label>
                                    Middle Name
                                </label>

                                <input
                                    type="text"
                                    value="${escapeHTML(admin.middleName || "")}"
                                >

                            </div>


                        </div>


                        <div class="form-grid">


                            <div class="form-group">

                                <label>
                                    Contact Number
                                </label>

                                <input
                                    type="text"
                                    value="${escapeHTML(admin.contact)}"
                                    required
                                >

                                <small class="field-error">
                                    This field is required.
                                </small>

                            </div>


                            <div class="form-group">

                                <label>
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value="${escapeHTML(admin.email)}"
                                    required
                                >

                                <small class="field-error">
                                    This field is required.
                                </small>

                            </div>


                        </div>


                        <div class="form-grid">

                            <!-- CAMPUS -->

                            <div class="form-group">

                                <label>
                                    Campus
                                </label>

                                <select class="edit-admin-campus" required>

                                    <option
                                        value="College"
                                        ${admin.campus === "College" ? "selected" : ""}
                                    >
                                        College
                                    </option>

                                    <option
                                        value="CBAS"
                                        ${admin.campus === "CBAS" ? "selected" : ""}
                                    >
                                        CBAS
                                    </option>

                                    <option
                                        value="Muzon"
                                        ${admin.campus === "Muzon" ? "selected" : ""}
                                    >
                                        Muzon
                                    </option>

                                    <option
                                        value="Francisco"
                                        ${admin.campus === "Francisco" ? "selected" : ""}
                                    >
                                        Francisco
                                    </option>

                                </select>

                                <small class="field-error">
                                    This field is required.
                                </small>

                            </div>


                            <!-- ELECTION MANAGEMENT -->

                            <div class="form-group">

                                <label>
                                    Election Management
                                </label>

                                <select
                                    class="edit-admin-election-type"
                                    required
                                >

                                    <option
                                        value="SSC"
                                        ${admin.electionType === "SSC" ? "selected" : ""}
                                    >
                                        SSC Election
                                    </option>

                                    <option
                                        value="DEPARTMENT"
                                        ${admin.electionType === "DEPARTMENT" ? "selected" : ""}
                                    >
                                        Department Election
                                    </option>

                                </select>

                                <small class="field-error">
                                    This field is required.
                                </small>

                            </div>

                        </div>


                        <!-- DEPARTMENT -->

                        <div class="form-group">

                            <label>
                                Department
                            </label>

                            <select
                                class="edit-admin-department"
                                required
                                ${admin.electionType === "SSC" ? "disabled" : ""}
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option
                                    value="BSA"
                                    ${admin.department === "BSA" ? "selected" : ""}
                                >
                                    BSA — Accountancy
                                </option>

                                <option
                                    value="BSBA"
                                    ${admin.department === "BSBA" ? "selected" : ""}
                                >
                                    BSBA — Business Administration
                                </option>

                                <option
                                    value="BAEL"
                                    ${admin.department === "BAEL" ? "selected" : ""}
                                >
                                    BAEL — Communication Arts
                                </option>

                                <option
                                    value="BSCRIM"
                                    ${admin.department === "BSCRIM" ? "selected" : ""}
                                >
                                    BSCRIM — Criminology
                                </option>

                                <option
                                    value="BSCE"
                                    ${admin.department === "BSCE" ? "selected" : ""}
                                >
                                    BSCE — Engineering
                                </option>

                                <option
                                    value="BSHM"
                                    ${admin.department === "BSHM" ? "selected" : ""}
                                >
                                    BSHM — Hospitality Management
                                </option>

                                <option
                                    value="BSIS"
                                    ${admin.department === "BSIS" ? "selected" : ""}
                                >
                                    BSIS — Information Systems
                                </option>

                                <option
                                    value="BSPSY"
                                    ${admin.department === "BSPSY" ? "selected" : ""}
                                >
                                    BSPSY — Psychology
                                </option>

                                <option
                                    value="EDUC"
                                    ${admin.department === "EDUC" ? "selected" : ""}
                                >
                                    EDUC — Teacher Education
                                </option>

                                <option
                                    value="BSAIS"
                                    ${admin.department === "BSAIS" ? "selected" : ""}
                                >
                                    BSAIS — Accountancy Information Systems
                                </option>

                            </select>

                            <small class="field-error">
                                This field is required.
                            </small>

                        </div>


                        <div class="form-grid">


                            <div class="form-group">

                                <label>
                                    Password
                                </label>

                                <div class="password-field">

                                    <input
                                        type="password"
                                        value="${escapeHTML(admin.password)}"
                                        required
                                    >

                                    <button
                                        type="button"
                                        class="password-toggle"
                                        aria-label="Show password"
                                    >
                                        <i class="bi bi-eye"></i>
                                    </button>

                                </div>

                                <small class="field-error">
                                    This field is required.
                                </small>

                            </div>


                            <div class="form-group">

                                <label>
                                    Confirm Password
                                </label>

                                <div class="password-field">

                                    <input
                                        type="password"
                                        value="${escapeHTML(admin.password)}"
                                        required
                                    >

                                    <button
                                        type="button"
                                        class="password-toggle"
                                        aria-label="Show password"
                                    >
                                        <i class="bi bi-eye"></i>
                                    </button>

                                </div>

                                <small class="field-error password-match-error">

                                    <span class="required-message">
                                        This field is required.
                                    </span>

                                    <span class="password-mismatch-message">
                                        Passwords do not match.
                                    </span>

                                </small>

                            </div>


                        </div>


                        <div class="edit-actions">

                            <button
                                type="button"
                                class="discard-btn cancel-edit"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                class="save-btn"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </article>

        `;
    })
    .join("");
}

/* =========================================================
   SETTINGS TABS
========================================================= */

function initializeSettingsTabs() {
  const tabs = document.querySelectorAll(".settings-tab");

  const panels = document.querySelectorAll(".settings-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((item) => {
        item.classList.remove("active");
      });

      panels.forEach((panel) => {
        panel.classList.remove("active");
      });

      tab.classList.add("active");

      const targetPanel = document.getElementById(target);

      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}

/* =========================================================
   SETTINGS ACCORDIONS
========================================================= */

function initializeSettingsAccordions() {
  const accordions = document.querySelectorAll(".settings-accordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".settings-accordion-header");

    if (!header) return;

    header.addEventListener("click", () => {
      accordion.classList.toggle("active");
    });
  });
}

/* =========================================================
   ADMIN CONTROLS
========================================================= */

function initializeAdminControls() {
  const adminItems = document.querySelectorAll(".admin-item");

  adminItems.forEach((item) => {
    setAdminEditMode(item, false);
    storeAdminOriginalValues(item);

    /* ---------------------------------------------
   EXPAND / VIEW
--------------------------------------------- */

    const expandButton = item.querySelector(".expand-admin");

    if (expandButton) {
      expandButton.addEventListener("click", (event) => {
        event.stopPropagation();

        /*
         * Expand only controls visibility.
         * It does NOT enable editing.
         */

        const isExpanded = item.classList.contains("expanded");

        if (isExpanded) {
          item.classList.remove("expanded");

          item.classList.remove("editing");

          setAdminEditMode(item, false);
        } else {
          item.classList.add("expanded");

          item.classList.remove("editing");

          setAdminEditMode(item, false);
        }

        updateExpandIcon(item);
      });
    }

    /* ---------------------------------------------
           EDIT
        --------------------------------------------- */

    const editButton = item.querySelector(".edit-admin");

    if (editButton) {
      editButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const isEditing = item.classList.contains("editing");

        if (isEditing) {
          /*
           * SECOND CLICK:
           * Collapse and exit edit mode.
           */

          item.classList.remove("editing");
          item.classList.remove("expanded");

          setAdminEditMode(item, false);
        } else {
          /*
           * FIRST CLICK:
           * Expand and enter edit mode.
           */

          item.classList.add("expanded");
          item.classList.add("editing");

          setAdminEditMode(item, true);
        }

        updateExpandIcon(item);
      });
    }

    /* ---------------------------------------------
   ARCHIVE
--------------------------------------------- */

    const archiveButton = item.querySelector(".archive-admin");

    if (archiveButton) {
      archiveButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const name = item.dataset.name || "this administrator";

        pendingArchiveAdmin = item;

        const archiveMessage = document.getElementById("archiveAdminMessage");

        if (archiveMessage) {
          archiveMessage.textContent = `Are you sure you want to archive ${name}?`;
        }

        openSettingsModal("archiveAdminModal");
      });
    }

    /* ---------------------------------------------
           DELETE
        --------------------------------------------- */

    const deleteButton = item.querySelector(".delete-admin");

    if (deleteButton) {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const name = item.dataset.name || "this administrator";

        pendingDeleteAdmin = item;

        const deleteMessage = document.getElementById("deleteAdminMessage");

        if (deleteMessage) {
          deleteMessage.textContent = `Are you sure you want to delete ${name}?`;
        }

        openSettingsModal("deleteAdminModal");
      });
    }

    /* ---------------------------------------------
           CANCEL EDIT
        --------------------------------------------- */

    const cancelButton = item.querySelector(".cancel-edit");

    if (cancelButton) {
      cancelButton.addEventListener("click", (event) => {
        event.preventDefault();

        restoreAdminOriginalValues(item);

        item.classList.remove("editing");

        setAdminEditMode(item, false);

        item.classList.remove("expanded");

        updateExpandIcon(item);
      });
    }
  });
}

/* =========================================================
   ADMIN VIEW / EDIT MODE
========================================================= */

function setAdminEditMode(item, editing) {
  if (!item) return;

  const viewDetails = item.querySelector(".admin-view-details");

  if (viewDetails) {
    viewDetails.style.display = editing ? "none" : "block";
  }

  const form = item.querySelector(".edit-admin-form");

  if (!form) return;

  /* ---------------------------------------------
       SHOW EDIT FORM ONLY WHEN ACTUALLY EDITING
    --------------------------------------------- */

  form.style.display = editing ? "block" : "none";

  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    /*
     * Password fields should not be editable
     * while simply viewing the administrator.
     */

    if (field.tagName === "INPUT") {
      if (field.type === "checkbox" || field.type === "radio") {
        field.disabled = !editing;
      } else {
        field.readOnly = !editing;
      }
    }

    if (field.tagName === "SELECT") {
      field.disabled = !editing;
    }

    if (field.tagName === "TEXTAREA") {
      field.readOnly = !editing;
    }
  });

  const passwordToggles = form.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    toggle.disabled = !editing;
  });

  const editActions = form.querySelector(".edit-actions");

  if (editActions) {
    editActions.style.display = editing ? "grid" : "none";
  }
}

/* =========================================================
   STORE ORIGINAL ADMIN VALUES
========================================================= */

function storeAdminOriginalValues(item) {
  const form = item.querySelector(".edit-admin-form");

  if (!form) return;

  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    if (field.tagName === "SELECT") {
      field.dataset.originalValue = field.value;
    } else {
      field.dataset.originalValue = field.value;
    }
  });
}

/* =========================================================
   RESTORE ORIGINAL ADMIN VALUES
========================================================= */

function restoreAdminOriginalValues(item) {
  const form = item.querySelector(".edit-admin-form");

  if (!form) return;

  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    if (field.dataset.originalValue !== undefined) {
      field.value = field.dataset.originalValue;
    }
  });

  form.querySelectorAll(".form-group.has-error").forEach((group) => {
    group.classList.remove("has-error");

    group.classList.remove("password-mismatch");
  });
}

/* =========================================================
   EXPAND ICON
========================================================= */

function updateExpandIcon(item) {
  const button = item.querySelector(".expand-admin");

  if (!button) return;

  const icon = button.querySelector("i");

  if (!icon) return;

  if (item.classList.contains("expanded")) {
    icon.className = "bi bi-chevron-up";

    button.title = "Collapse Admin";
  } else {
    icon.className = "bi bi-chevron-down";

    button.title = "View Admin";
  }
}

/* =========================================================
   ADMIN SEARCH
========================================================= */

function initializeAdminSearch() {
  const searchInput = document.getElementById("adminSearch");

  const adminList = document.getElementById("adminList");

  if (!searchInput || !adminList) {
    return;
  }

  searchInput.addEventListener("input", () => {
    applyAdminFilters();
  });
}

/* =========================================================
   ADMIN FILTERS
========================================================= */

function initializeAdminFilters() {
  const filterButton = document.getElementById("adminFilterBtn");

  const filterDropdown = document.getElementById("adminFilterDropdown");

  const closeButton = document.getElementById("closeAdminFilters");

  const clearButton = document.getElementById("clearAdminFilters");

  const applyButton = document.getElementById("applyAdminFilters");

  const campusFilter = document.getElementById("adminCampusFilter");

  const departmentFilter = document.getElementById("adminDepartmentFilter");

  const electionTypeFilter = document.getElementById("adminElectionTypeFilter");

  const filterCount = document.getElementById("adminFilterCount");

  const existingAdminsAccordion = document.getElementById(
    "existingAdminsAccordion",
  );

  if (
    !filterButton ||
    !filterDropdown ||
    !campusFilter ||
    !departmentFilter ||
    !electionTypeFilter
  ) {
    return;
  }

  /* ---------------------------------------------
       OPEN / CLOSE FILTER DROPDOWN
    --------------------------------------------- */

  filterButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = filterDropdown.classList.toggle("active");

    filterButton.classList.toggle("active", isOpen);

    if (existingAdminsAccordion) {
      existingAdminsAccordion.classList.toggle("filter-open", isOpen);
    }
  });

  /* ---------------------------------------------
       CLOSE BUTTON
    --------------------------------------------- */

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      filterDropdown.classList.remove("active");

      filterButton.classList.remove("active");

      if (existingAdminsAccordion) {
        existingAdminsAccordion.classList.remove("filter-open");
      }
    });
  }

  /* ---------------------------------------------
       PREVENT DROPDOWN CLICK FROM CLOSING
    --------------------------------------------- */

  filterDropdown.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  /* ---------------------------------------------
       APPLY FILTERS
    --------------------------------------------- */

  if (applyButton) {
    applyButton.addEventListener("click", () => {
      applyAdminFilters();

      filterDropdown.classList.remove("active");

      filterButton.classList.remove("active");

      if (existingAdminsAccordion) {
        existingAdminsAccordion.classList.remove("filter-open");
      }
    });
  }

  /* ---------------------------------------------
       CLEAR FILTERS
    --------------------------------------------- */

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      campusFilter.value = "";

      electionTypeFilter.value = "";

      departmentFilter.value = "";

      updateAdminFilterCount();

      applyAdminFilters();
    });
  }

  /* ---------------------------------------------
       FILTER COUNT
    --------------------------------------------- */

  campusFilter.addEventListener("change", updateAdminFilterCount);

  electionTypeFilter.addEventListener("change", updateAdminFilterCount);

  departmentFilter.addEventListener("change", updateAdminFilterCount);

  /* ---------------------------------------------
       CLOSE WHEN CLICKING OUTSIDE
    --------------------------------------------- */

  document.addEventListener("click", (event) => {
    if (
      !filterDropdown.contains(event.target) &&
      !filterButton.contains(event.target)
    ) {
      filterDropdown.classList.remove("active");

      filterButton.classList.remove("active");
    }
  });

  updateAdminFilterCount();
}

/* =========================================================
   APPLY ADMIN SEARCH + FILTERS
========================================================= */

function applyAdminFilters() {
  const searchInput = document.getElementById("adminSearch");

  const campusFilter = document.getElementById("adminCampusFilter");

  const electionTypeFilter = document.getElementById("adminElectionTypeFilter");

  const departmentFilter = document.getElementById("adminDepartmentFilter");

  const adminList = document.getElementById("adminList");

  if (
    !searchInput ||
    !campusFilter ||
    !electionTypeFilter ||
    !departmentFilter ||
    !adminList
  ) {
    return;
  }

  const query = searchInput.value.trim().toLowerCase();

  const selectedCampus = campusFilter.value.trim().toLowerCase();

  const selectedElectionType = electionTypeFilter.value.trim().toLowerCase();

  const selectedDepartment = departmentFilter.value.trim().toLowerCase();

  const adminItems = adminList.querySelectorAll(".admin-item");

  adminItems.forEach((admin) => {
    const name = (admin.dataset.name || "").toLowerCase();

    const email = (admin.dataset.email || "").toLowerCase();

    const campus = (admin.dataset.campus || "").toLowerCase();

    const electionType = (admin.dataset.electionType || "").toLowerCase();

    const department = (admin.dataset.department || "").toLowerCase();

    const text = admin.textContent.toLowerCase();

    /* -----------------------------------------
           SEARCH
        ----------------------------------------- */

    const searchMatch =
      !query ||
      name.includes(query) ||
      email.includes(query) ||
      text.includes(query);

    /* -----------------------------------------
           CAMPUS
        ----------------------------------------- */

    const campusMatch = !selectedCampus || campus === selectedCampus;

    /* -----------------------------------------
           ELECTION TYPE
        ----------------------------------------- */

    const electionTypeMatch =
      !selectedElectionType || electionType === selectedElectionType;

    /* -----------------------------------------
           DEPARTMENT
        ----------------------------------------- */

    let departmentMatch = true;

    /*
     * "All Departments" = no department restriction.
     */
    if (selectedDepartment) {
      /*
       * A specific department was selected.
       *
       * SSC admins do NOT match because
       * SSC elections have no department.
       */
      departmentMatch =
        electionType === "department" && department === selectedDepartment;
    }

    /* -----------------------------------------
           FINAL RESULT
        ----------------------------------------- */

    const matches =
      searchMatch && campusMatch && electionTypeMatch && departmentMatch;

    admin.dataset.paginationHidden = matches ? "false" : "true";
  });

  /* ---------------------------------------------
       RESET PAGINATION
    --------------------------------------------- */

  adminCurrentPage = 1;

  if (window.renderAdminPage) {
    window.renderAdminPage();
  }
}

/* =========================================================
   UPDATE FILTER COUNT
========================================================= */

function updateAdminFilterCount() {
  const campusFilter = document.getElementById("adminCampusFilter");

  const electionTypeFilter = document.getElementById("adminElectionTypeFilter");

  const departmentFilter = document.getElementById("adminDepartmentFilter");

  const filterCount = document.getElementById("adminFilterCount");

  if (
    !campusFilter ||
    !electionTypeFilter ||
    !departmentFilter ||
    !filterCount
  ) {
    return;
  }

  let count = 0;

  if (campusFilter.value) {
    count++;
  }

  if (electionTypeFilter.value) {
    count++;
  }

  if (departmentFilter.value) {
    count++;
  }

  filterCount.textContent = count;
}

/* =========================================================
   ADMIN PAGINATION
========================================================= */

function initializeAdminPagination() {
  const adminList = document.getElementById("adminList");

  const pagination = document.getElementById("adminPagination");

  const prevButton = document.getElementById("adminPrevPage");

  const nextButton = document.getElementById("adminNextPage");

  const pageInfo = document.getElementById("adminPageInfo");

  if (!adminList || !pagination || !prevButton || !nextButton || !pageInfo) {
    return;
  }

  function renderAdminPage() {
    const adminItems = Array.from(adminList.querySelectorAll(".admin-item"));

    /* ---------------------------------------------
           ONLY INCLUDE ADMINS THAT MATCH SEARCH
        --------------------------------------------- */

    const visibleAdmins = adminItems.filter((admin) => {
      return admin.dataset.paginationHidden !== "true";
    });

    /* ---------------------------------------------
           CALCULATE TOTAL PAGES
        --------------------------------------------- */

    const totalPages = Math.max(
      1,
      Math.ceil(visibleAdmins.length / ADMIN_PER_PAGE),
    );

    /* ---------------------------------------------
           KEEP CURRENT PAGE VALID
        --------------------------------------------- */

    if (adminCurrentPage > totalPages) {
      adminCurrentPage = totalPages;
    }

    if (adminCurrentPage < 1) {
      adminCurrentPage = 1;
    }

    /* ---------------------------------------------
           CALCULATE PAGE RANGE
        --------------------------------------------- */

    const start = (adminCurrentPage - 1) * ADMIN_PER_PAGE;

    const end = start + ADMIN_PER_PAGE;

    /* ---------------------------------------------
           HIDE / SHOW ADMINS
        --------------------------------------------- */

    adminItems.forEach((admin) => {
      admin.style.display = "none";
    });

    visibleAdmins.forEach((admin, index) => {
      if (index >= start && index < end) {
        admin.style.display = "";
      }
    });

    /* ---------------------------------------------
           PAGE INFORMATION
        --------------------------------------------- */

    pageInfo.textContent = `Page ${adminCurrentPage} of ${totalPages}`;

    /* ---------------------------------------------
           BUTTON STATES
        --------------------------------------------- */

    prevButton.disabled = adminCurrentPage === 1;

    nextButton.disabled = adminCurrentPage === totalPages;

    /* ---------------------------------------------
           SHOW PAGINATION ONLY WHEN NEEDED
        --------------------------------------------- */

    pagination.style.display =
      visibleAdmins.length > ADMIN_PER_PAGE ? "flex" : "none";
  }

  /* ---------------------------------------------
       PREVIOUS PAGE
    --------------------------------------------- */

  prevButton.addEventListener("click", () => {
    if (adminCurrentPage > 1) {
      adminCurrentPage--;

      renderAdminPage();
    }
  });

  /* ---------------------------------------------
       NEXT PAGE
    --------------------------------------------- */

  nextButton.addEventListener("click", () => {
    const adminItems = Array.from(adminList.querySelectorAll(".admin-item"));

    const visibleAdmins = adminItems.filter((admin) => {
      return admin.dataset.paginationHidden !== "true";
    });

    const totalPages = Math.max(
      1,
      Math.ceil(visibleAdmins.length / ADMIN_PER_PAGE),
    );

    if (adminCurrentPage < totalPages) {
      adminCurrentPage++;

      renderAdminPage();
    }
  });

  /* ---------------------------------------------
       MAKE AVAILABLE TO SEARCH / OTHER FUNCTIONS
    --------------------------------------------- */

  window.renderAdminPage = renderAdminPage;

  /* ---------------------------------------------
       INITIAL RENDER
    --------------------------------------------- */

  renderAdminPage();
}

/* =========================================================
   PASSWORD TOGGLES
========================================================= */

function initializePasswordToggles() {
  const toggles = document.querySelectorAll(".password-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      let input;

      const target = toggle.dataset.target;

      if (target) {
        input = document.getElementById(target);
      } else {
        input = toggle.parentElement.querySelector("input");
      }

      if (!input) return;

      const icon = toggle.querySelector("i");

      if (input.type === "password") {
        input.type = "text";

        if (icon) {
          icon.className = "bi bi-eye-slash";
        }

        toggle.setAttribute("aria-label", "Hide password");
      } else {
        input.type = "password";

        if (icon) {
          icon.className = "bi bi-eye";
        }

        toggle.setAttribute("aria-label", "Show password");
      }
    });
  });
}

/* =========================================================
   FORMS
========================================================= */

function initializeAdminForms() {
  /* ---------------------------------------------
       ADD ADMIN
    --------------------------------------------- */

  const addForm = document.getElementById("addAdminForm");

  if (addForm) {
    const requiredFields = addForm.querySelectorAll(
      "input[required], select[required]",
    );

    /* ---------------------------------------------
           CLEAR ERROR WHEN USER ENTERS THE FIELD
        --------------------------------------------- */

    requiredFields.forEach((field) => {
      field.addEventListener("focus", () => {
        clearFieldError(field);
      });
    });

    /* ---------------------------------------------
           PASSWORD MATCH VALIDATION
        --------------------------------------------- */

    const password = document.getElementById("adminPassword");

    const confirmPassword = document.getElementById("adminConfirmPassword");

    if (password && confirmPassword) {
      password.addEventListener("input", () => {
        validatePasswordMatch();
      });

      confirmPassword.addEventListener("focus", () => {
        confirmPassword.dataset.touched = "true";
      });

      confirmPassword.addEventListener("input", () => {
        confirmPassword.dataset.touched = "true";
        validatePasswordMatch();
      });
    }

    /* ---------------------------------------------
           SUBMIT
        --------------------------------------------- */

    addForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      /* -----------------------------------------
                   REQUIRED FIELDS
                ----------------------------------------- */

      requiredFields.forEach((field) => {
        /*
         * Disabled fields are intentionally excluded
         * from validation.
         *
         * This is important for SSC Election because
         * Department is disabled and must remain blank.
         */
        if (field.disabled) {
          return;
        }

        if (field.value.trim() === "") {
          showFieldError(field);

          isValid = false;
        }
      });

      /* -----------------------------------------
                   PASSWORD MATCH
                ----------------------------------------- */
      confirmPassword.dataset.touched = "true";

      if (!validatePasswordMatch()) {
        isValid = false;
      }

      /* -----------------------------------------
                   STOP IF INVALID
                ----------------------------------------- */

      if (!isValid) {
        return;
      }

      /* -----------------------------------------
                   OPEN CONFIRMATION MODAL
                ----------------------------------------- */

      pendingAddAdminForm = addForm;

      openSettingsModal("addAdminModal");
    });
  }

  /* ---------------------------------------------
   EDIT ADMIN
--------------------------------------------- */

  const editForms = document.querySelectorAll(".edit-admin-form");

  editForms.forEach((form) => {
    const requiredFields = form.querySelectorAll(
      "input[required], select[required]",
    );

    /* -----------------------------------------
           CLEAR ERROR WHEN USER INTERACTS
        ----------------------------------------- */

    requiredFields.forEach((field) => {
      field.addEventListener("focus", () => {
        field.dataset.touched = "true";

        clearFieldError(field);
      });

      field.addEventListener("input", () => {
        if (field.value.trim() !== "") {
          clearFieldError(field);
        }

        validateEditPasswordMatch(form);
      });

      field.addEventListener("change", () => {
        if (field.value.trim() !== "") {
          clearFieldError(field);
        }

        validateEditPasswordMatch(form);
      });
    });

    /* -----------------------------------------
           PASSWORD MATCH
        ----------------------------------------- */

    const passwordFields = form.querySelectorAll(".password-field input");

    if (passwordFields.length >= 2) {
      passwordFields[0].addEventListener("input", () => {
        validateEditPasswordMatch(form);
      });

      passwordFields[1].addEventListener("input", () => {
        validateEditPasswordMatch(form);
      });
    }

    /* -----------------------------------------
           SUBMIT
        ----------------------------------------- */

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      /* -------------------------------------
                   REQUIRED FIELDS
                ------------------------------------- */

      requiredFields.forEach((field) => {
        if (field.value.trim() === "") {
          showFieldError(field);

          isValid = false;
        }
      });

      /* -------------------------------------
                   PASSWORD MATCH
                ------------------------------------- */

      if (!validateEditPasswordMatch(form)) {
        isValid = false;
      }

      /* -------------------------------------
                   STOP IF INVALID
                ------------------------------------- */

      if (!isValid) {
        return;
      }

      /* -------------------------------------
                   OPEN UPDATE MODAL
                ------------------------------------- */

      pendingUpdateForm = form;

      openSettingsModal("updateAdminModal");
    });
  });

  /* ---------------------------------------------
   SYSTEM SETTINGS
--------------------------------------------- */

  const systemForm = document.querySelector(".system-form");

  if (systemForm) {
    const requiredFields = systemForm.querySelectorAll(
      "input[required], select[required]",
    );

    requiredFields.forEach((field) => {
      field.addEventListener("focus", () => {
        clearFieldError(field);
      });

      field.addEventListener("input", () => {
        if (field.value.trim() !== "") {
          clearFieldError(field);
        }
      });

      field.addEventListener("change", () => {
        if (field.value.trim() !== "") {
          clearFieldError(field);
        }
      });
    });

    systemForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      requiredFields.forEach((field) => {
        if (field.value.trim() === "") {
          showFieldError(field);

          isValid = false;
        }
      });

      if (!isValid) {
        return;
      }

      pendingSaveForm = systemForm;

      openSettingsModal("saveSettingsModal");
    });
  }

  /* ---------------------------------------------
   SECURITY
--------------------------------------------- */

  const securityForm = document.querySelector(".security-form");

  if (securityForm) {
    const requiredFields = securityForm.querySelectorAll("input[required]");

    const password = requiredFields[1];

    const confirmPassword = requiredFields[2];

    requiredFields.forEach((field) => {
      field.addEventListener("focus", () => {
        clearFieldError(field);
      });

      field.addEventListener("input", () => {
        if (field.value.trim() !== "") {
          clearFieldError(field);
        }

        validateSecurityPasswordMatch();
        validateSecurityPasswordSame();
      });
    });

    securityForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      /* -----------------------------------------
                   REQUIRED FIELDS
                ----------------------------------------- */

      requiredFields.forEach((field) => {
        if (field.value.trim() === "") {
          showFieldError(field);

          isValid = false;
        }
      });

      /* -----------------------------------------
                   PASSWORD MATCH
                ----------------------------------------- */

      const confirmPassword = requiredFields[2];

      if (confirmPassword) {
        confirmPassword.dataset.touched = "true";
      }

      if (!validateSecurityPasswordMatch()) {
        isValid = false;
      }

      /* -----------------------------------------
                    CURRENT PASSWORD / NEW PASSWORD
                ----------------------------------------- */

      if (!validateSecurityPasswordSame()) {
        isValid = false;
      }

      /* -----------------------------------------
                   STOP IF INVALID
                ----------------------------------------- */

      if (!isValid) {
        return;
      }

      /* -----------------------------------------
                   OPEN CONFIRMATION MODAL
                ----------------------------------------- */

      pendingSaveForm = securityForm;

      openSettingsModal("saveSettingsModal");
    });
  }
}

/* =========================================================
   ELECTION MANAGEMENT / DEPARTMENT TOGGLE
========================================================= */

/* =========================================================
   ELECTION MANAGEMENT / DEPARTMENT TOGGLE
========================================================= */

function initializeElectionManagementFields() {
  /* ---------------------------------------------
       ADD ADMIN
    --------------------------------------------- */

  const electionType = document.getElementById("adminElectionType");

  const department = document.getElementById("adminDepartment");

  if (electionType && department) {
    function updateAddAdminDepartmentState() {
      if (electionType.value === "SSC") {
        /*
         * SSC Election does not require a department.
         */

        department.value = "";

        department.disabled = true;

        department.removeAttribute("required");

        clearFieldError(department);
      } else if (electionType.value === "DEPARTMENT") {
        /*
         * Department Election requires a department.
         */

        department.disabled = false;

        department.setAttribute("required", "required");
      } else {
        /*
         * No election type selected yet.
         */

        department.value = "";

        department.disabled = true;

        department.removeAttribute("required");

        clearFieldError(department);
      }
    }

    electionType.addEventListener("change", () => {
      updateAddAdminDepartmentState();
    });

    /*
     * Set the correct state when the page first loads.
     */
    updateAddAdminDepartmentState();
  }

  /* ---------------------------------------------
       EDIT ADMINS
    --------------------------------------------- */

  document.querySelectorAll(".admin-item").forEach((item) => {
    const electionSelect = item.querySelector(".edit-admin-election-type");

    const departmentSelect = item.querySelector(".edit-admin-department");

    if (!electionSelect || !departmentSelect) {
      return;
    }

    function updateDepartmentState() {
      if (electionSelect.value === "SSC") {
        departmentSelect.value = "";

        departmentSelect.disabled = true;

        departmentSelect.removeAttribute("required");

        clearFieldError(departmentSelect);
      } else if (electionSelect.value === "DEPARTMENT") {
        departmentSelect.disabled = false;

        departmentSelect.setAttribute("required", "required");
      }
    }

    electionSelect.addEventListener("change", updateDepartmentState);

    updateDepartmentState();
  });
}

/* =========================================================
   FIELD VALIDATION
========================================================= */

function showFieldError(field) {
  const formGroup = field.closest(".form-group");

  if (!formGroup) return;

  formGroup.classList.add("has-error");
}

/* =========================================================
   CLEAR FIELD ERROR
========================================================= */

function clearFieldError(field) {
  const formGroup = field.closest(".form-group");

  if (!formGroup) return;

  formGroup.classList.remove("has-error");
}

/* =========================================================
   PASSWORD MATCH VALIDATION
========================================================= */

function validatePasswordMatch() {
  const password = document.getElementById("adminPassword");

  const confirmPassword = document.getElementById("adminConfirmPassword");

  if (!password || !confirmPassword) {
    return true;
  }

  const confirmGroup = confirmPassword.closest(".form-group");

  if (!confirmGroup) {
    return true;
  }

  if (!confirmPassword.dataset.touched && confirmPassword.value.trim() === "") {
    return true;
  }

  const errorElement = confirmGroup.querySelector(".password-match-error");

  const requiredMessage = errorElement?.querySelector(".required-message");

  const mismatchMessage = errorElement?.querySelector(
    ".password-mismatch-message",
  );

  /* ---------------------------------------------
       EMPTY CONFIRM PASSWORD
    --------------------------------------------- */

  if (confirmPassword.value.trim() === "") {
    confirmGroup.classList.add("has-error");

    confirmGroup.classList.remove("password-mismatch");

    if (requiredMessage) {
      requiredMessage.style.display = "inline";
    }

    if (mismatchMessage) {
      mismatchMessage.style.display = "none";
    }

    return false;
  }

  /* ---------------------------------------------
       PASSWORDS DO NOT MATCH
    --------------------------------------------- */

  if (password.value !== confirmPassword.value) {
    confirmGroup.classList.add("has-error");

    confirmGroup.classList.add("password-mismatch");

    if (requiredMessage) {
      requiredMessage.style.display = "none";
    }

    if (mismatchMessage) {
      mismatchMessage.style.display = "inline";
    }

    return false;
  }

  /* ---------------------------------------------
       PASSWORDS MATCH
    --------------------------------------------- */

  confirmGroup.classList.remove("has-error");

  confirmGroup.classList.remove("password-mismatch");

  if (requiredMessage) {
    requiredMessage.style.display = "none";
  }

  if (mismatchMessage) {
    mismatchMessage.style.display = "none";
  }

  return true;
}

/* =========================================================
   EDIT ADMIN PASSWORD MATCH VALIDATION
========================================================= */

function validateEditPasswordMatch(form) {
  if (!form) {
    return true;
  }

  const passwordFields = form.querySelectorAll(".password-field input");

  if (passwordFields.length < 2) {
    return true;
  }

  const password = passwordFields[0];

  const confirmPassword = passwordFields[1];

  const confirmGroup = confirmPassword.closest(".form-group");

  if (!confirmGroup) {
    return true;
  }

  /* ---------------------------------------------
       EMPTY CONFIRM PASSWORD
    --------------------------------------------- */

  if (confirmPassword.value.trim() === "") {
    confirmGroup.classList.remove("password-mismatch");

    return false;
  }

  /* ---------------------------------------------
       PASSWORDS DO NOT MATCH
    --------------------------------------------- */

  if (password.value !== confirmPassword.value) {
    confirmGroup.classList.add("has-error");

    confirmGroup.classList.add("password-mismatch");

    return false;
  }

  /* ---------------------------------------------
       PASSWORDS MATCH
    --------------------------------------------- */

  confirmGroup.classList.remove("has-error");

  confirmGroup.classList.remove("password-mismatch");

  return true;
}

/* =========================================================
   SECURITY PASSWORD MATCH VALIDATION
========================================================= */

function validateSecurityPasswordMatch() {
  const securityForm = document.querySelector(".security-form");

  if (!securityForm) {
    return true;
  }

  const passwordFields = securityForm.querySelectorAll("input[required]");

  if (passwordFields.length < 3) {
    return true;
  }

  const password = passwordFields[1];

  const confirmPassword = passwordFields[2];

  const confirmGroup = confirmPassword.closest(".form-group");

  if (!confirmGroup) {
    return true;
  }

  if (!confirmPassword.dataset.touched && confirmPassword.value.trim() === "") {
    return true;
  }

  const errorElement = confirmGroup.querySelector(".password-match-error");

  const requiredMessage = errorElement?.querySelector(".required-message");

  const mismatchMessage = errorElement?.querySelector(
    ".password-mismatch-message",
  );

  /* ---------------------------------------------
       EMPTY CONFIRM PASSWORD
    --------------------------------------------- */

  if (confirmPassword.value.trim() === "") {
    confirmGroup.classList.add("has-error");

    confirmGroup.classList.remove("password-mismatch");

    if (requiredMessage) {
      requiredMessage.style.display = "inline";
    }

    if (mismatchMessage) {
      mismatchMessage.style.display = "none";
    }

    return false;
  }

  /* ---------------------------------------------
       PASSWORDS DO NOT MATCH
    --------------------------------------------- */

  if (password.value !== confirmPassword.value) {
    confirmGroup.classList.add("has-error");

    confirmGroup.classList.add("password-mismatch");

    if (requiredMessage) {
      requiredMessage.style.display = "none";
    }

    if (mismatchMessage) {
      mismatchMessage.style.display = "inline";
    }

    return false;
  }

  /* ---------------------------------------------
       PASSWORDS MATCH
    --------------------------------------------- */

  confirmGroup.classList.remove("has-error");

  confirmGroup.classList.remove("password-mismatch");

  if (requiredMessage) {
    requiredMessage.style.display = "none";
  }

  if (mismatchMessage) {
    mismatchMessage.style.display = "none";
  }

  return true;
}

/* =========================================================
   SECURITY PASSWORD SAME VALIDATION
========================================================= */

function validateSecurityPasswordSame() {
  const securityForm = document.querySelector(".security-form");

  if (!securityForm) {
    return true;
  }

  const passwordFields = securityForm.querySelectorAll("input[required]");

  if (passwordFields.length < 3) {
    return true;
  }

  const currentPassword = passwordFields[0];

  const newPassword = passwordFields[1];

  const newPasswordGroup = newPassword.closest(".form-group");

  if (!newPasswordGroup) {
    return true;
  }

  const errorElement = newPasswordGroup.querySelector(".password-same-error");

  const sameMessage = errorElement?.querySelector(".password-same-message");

  /* ---------------------------------------------
       EMPTY NEW PASSWORD
       Required validation handles this.
  --------------------------------------------- */

  if (newPassword.value.trim() === "") {
    newPasswordGroup.classList.remove("password-same");

    if (sameMessage) {
      sameMessage.style.display = "none";
    }

    return true;
  }

  /* ---------------------------------------------
       CURRENT PASSWORD IS EMPTY
       Required validation handles this.
  --------------------------------------------- */

  if (currentPassword.value.trim() === "") {
    newPasswordGroup.classList.remove("password-same");

    if (sameMessage) {
      sameMessage.style.display = "none";
    }

    return true;
  }

  /* ---------------------------------------------
       PASSWORDS ARE THE SAME
  --------------------------------------------- */

  if (currentPassword.value === newPassword.value) {
    newPasswordGroup.classList.add("has-error");

    newPasswordGroup.classList.add("password-same");

    if (sameMessage) {
      sameMessage.style.display = "inline";
    }

    return false;
  }

  /* ---------------------------------------------
       PASSWORDS ARE DIFFERENT
  --------------------------------------------- */

  newPasswordGroup.classList.remove("password-same");

  /*
   * Only remove has-error if this error was caused
   * by the password-same validation.
   *
   * Required validation remains handled separately.
   */
  if (newPassword.value.trim() !== "") {
    newPasswordGroup.classList.remove("has-error");
  }

  if (sameMessage) {
    sameMessage.style.display = "none";
  }

  return true;
}

/* =========================================================
   SETTINGS MODALS
========================================================= */

let pendingAddAdminForm = null;

let pendingDeleteAdmin = null;

let pendingArchiveAdmin = null;

let pendingUpdateForm = null;

let pendingDiscardForm = null;

let pendingSaveForm = null;

let actionLoadingTimer = null;

/* =========================================================
   ACTION LOADING MODAL
========================================================= */

function showActionLoading(
  title = "Please wait",
  message = "Processing your request...",
) {
  const modal = document.getElementById("actionLoadingModal");

  const titleElement = document.getElementById("actionLoadingTitle");

  const messageElement = document.getElementById("actionLoadingMessage");

  if (!modal) return;

  if (titleElement) {
    titleElement.textContent = title;
  }

  if (messageElement) {
    messageElement.textContent = message;
  }

  clearTimeout(actionLoadingTimer);

  modal.classList.add("show");

  modal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-loading");
}

function hideActionLoading() {
  const modal = document.getElementById("actionLoadingModal");

  clearTimeout(actionLoadingTimer);

  if (!modal) {
    document.body.classList.remove("modal-loading");

    return;
  }

  modal.classList.remove("show");

  modal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-loading");
}

/* =========================================================
   OPEN MODAL
========================================================= */

function openSettingsModal(id) {
  const modal = document.getElementById(id);

  if (!modal) return;

  modal.classList.add("show");

  modal.setAttribute("aria-hidden", "false");
}

/* =========================================================
   CLOSE MODAL
========================================================= */

function closeSettingsModal(id) {
  const modal = document.getElementById(id);

  if (!modal) return;

  modal.classList.remove("show");

  modal.setAttribute("aria-hidden", "true");
}

/* =========================================================
   SETTINGS MODAL INITIALIZATION
========================================================= */

function initializeSettingsModals() {
  /* ---------------------------------------------
   IMPORT
--------------------------------------------- */

  const importButton = document.getElementById("importAdminBtn");

  if (importButton) {
    importButton.addEventListener("click", () => {
      showActionLoading(
        "Importing",
        "Please wait while the data is being imported...",
      );

      /*
       * Keep your existing import operation here.
       *
       * When the import actually finishes,
       * call:
       *
       * hideActionLoading();
       */
    });
  }
  /* ---------------------------------------------
   DISCARD BUTTONS
--------------------------------------------- */

  document.querySelectorAll(".discard-form-btn").forEach((button) => {
    button.addEventListener("click", () => {
      pendingDiscardForm = button.closest("form");

      if (!pendingDiscardForm) {
        return;
      }

      openSettingsModal("discardModal");
    });
  });

  /* ---------------------------------------------
       CLOSE BUTTONS
    --------------------------------------------- */

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.dataset.closeModal;

      closeSettingsModal(modalId);
    });
  });

  /* ---------------------------------------------
       CLICK OUTSIDE MODAL
    --------------------------------------------- */

  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeSettingsModal(modal.id);
      }
    });
  });

  /* ---------------------------------------------
       ESCAPE KEY
    --------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const openModal = document.querySelector(".modal-overlay.show");

    if (!openModal) {
      return;
    }

    /*
     * Do not allow the action loading modal
     * to be closed with Escape.
     */
    if (openModal.id === "actionLoadingModal") {
      return;
    }

    closeSettingsModal(openModal.id);
  });

  /* ---------------------------------------------
       ADD ADMIN
    --------------------------------------------- */

  const confirmAddAdmin = document.getElementById("confirmAddAdmin");

  if (confirmAddAdmin) {
    confirmAddAdmin.addEventListener("click", () => {
      if (!pendingAddAdminForm) {
        return;
      }

      const form = pendingAddAdminForm;

      showActionLoading(
        "Adding Administrator",
        "Please wait while the administrator is being added...",
      );

      pendingAddAdminForm = null;

      closeSettingsModal("addAdminModal");

      setTimeout(() => {
        form.reset();

        form.querySelectorAll(".form-group.has-error").forEach((group) => {
          group.classList.remove("has-error");

          group.classList.remove("password-mismatch");
        });

        hideActionLoading();

        showSuccessToast(
          "Administrator Added",
          "Administrator added successfully.",
        );
      }, 700);
    });
  }

  /* ---------------------------------------------
       UPDATE ADMIN
    --------------------------------------------- */

  const confirmUpdateAdmin = document.getElementById("confirmUpdateAdmin");

  if (confirmUpdateAdmin) {
    confirmUpdateAdmin.addEventListener("click", () => {
      if (!pendingUpdateForm) {
        return;
      }

      const updatedForm = pendingUpdateForm;

      const updatedItem = updatedForm.closest(".admin-item");

      showActionLoading(
        "Updating Administrator",
        "Please wait while the administrator information is being updated...",
      );

      pendingUpdateForm = null;

      closeSettingsModal("updateAdminModal");

      setTimeout(() => {
        if (updatedItem) {
          storeAdminOriginalValues(updatedItem);

          updatedItem.classList.remove("editing");

          setAdminEditMode(updatedItem, false);
        }

        hideActionLoading();

        showSuccessToast(
          "Administrator Updated",
          "Administrator information updated successfully.",
        );
      }, 700);
    });
  }

  /* ---------------------------------------------
   ARCHIVE ADMIN
--------------------------------------------- */

  const confirmArchiveAdmin = document.getElementById("confirmArchiveAdmin");

  if (confirmArchiveAdmin) {
    confirmArchiveAdmin.addEventListener("click", () => {
      if (!pendingArchiveAdmin) {
        return;
      }

      const item = pendingArchiveAdmin;

      showActionLoading(
        "Archiving Administrator",
        "Please wait while the administrator is being archived...",
      );

      pendingArchiveAdmin = null;

      closeSettingsModal("archiveAdminModal");

      item.style.opacity = "0";

      item.style.transform = "translateY(-8px)";

      item.style.transition = ".25s ease";

      setTimeout(() => {
        item.remove();

        if (window.renderAdminPage) {
          window.renderAdminPage();
        }

        hideActionLoading();

        showSuccessToast(
          "Administrator Archived",
          "Administrator archived successfully.",
        );
      }, 700);
    });
  }

  /* ---------------------------------------------
       DELETE ADMIN
    --------------------------------------------- */

  const confirmDeleteAdmin = document.getElementById("confirmDeleteAdmin");

  if (confirmDeleteAdmin) {
    confirmDeleteAdmin.addEventListener("click", () => {
      if (!pendingDeleteAdmin) {
        return;
      }

      const item = pendingDeleteAdmin;

      showActionLoading(
        "Deleting Administrator",
        "Please wait while the administrator is being deleted...",
      );

      pendingDeleteAdmin = null;

      closeSettingsModal("deleteAdminModal");

      item.style.opacity = "0";

      item.style.transform = "translateY(-8px)";

      item.style.transition = ".25s ease";

      setTimeout(() => {
        item.remove();

        if (window.renderAdminPage) {
          window.renderAdminPage();
        }

        hideActionLoading();

        showSuccessToast(
          "Administrator Deleted",
          "Administrator deleted successfully.",
        );
      }, 700);
    });
  }

  /* ---------------------------------------------
       DISCARD
    --------------------------------------------- */

  const confirmDiscard = document.getElementById("confirmDiscard");

  if (confirmDiscard) {
    confirmDiscard.addEventListener("click", () => {
      if (!pendingDiscardForm) {
        return;
      }

      const form = pendingDiscardForm;

      showActionLoading(
        "Discarding Changes",
        "Please wait while your changes are being discarded...",
      );

      pendingDiscardForm = null;

      closeSettingsModal("discardModal");

      setTimeout(() => {
        form.reset();

        const electionType = form.querySelector("#adminElectionType");

        const department = form.querySelector("#adminDepartment");

        if (electionType && department) {
          department.value = "";

          department.disabled = true;

          department.removeAttribute("required");
        }

        form.querySelectorAll("input").forEach((field) => {
          delete field.dataset.touched;
        });

        form.querySelectorAll(".form-group.has-error").forEach((group) => {
          group.classList.remove("has-error");

          group.classList.remove("password-mismatch");

          group.classList.remove("password-same");
        });

        hideActionLoading();

        showDiscardToast(
          "Changes Discarded",
          "Your changes have been discarded.",
        );
      }, 700);
    });
  }

  /* ---------------------------------------------
       SAVE SETTINGS
    --------------------------------------------- */

  const confirmSaveSettings = document.getElementById("confirmSaveSettings");

  if (confirmSaveSettings) {
    confirmSaveSettings.addEventListener("click", () => {
      if (!pendingSaveForm) {
        return;
      }

      const form = pendingSaveForm;

      showActionLoading(
        "Saving Settings",
        "Please wait while your settings are being saved...",
      );

      pendingSaveForm = null;

      closeSettingsModal("saveSettingsModal");

      setTimeout(() => {
        /*
         * Existing save operation completes here.
         */

        hideActionLoading();

        showSuccessToast("Settings Updated", "Settings saved successfully.");
      }, 700);
    });
  }
}

/* =========================================================
   SUCCESS TOAST
========================================================= */

let successToastTimer = null;

function showSuccessToast(
  title = "Success",
  message = "Action completed successfully.",
) {
  const toast = document.getElementById("successToast");

  const titleElement = document.getElementById("successToastTitle");

  const messageElement = document.getElementById("successToastMessage");

  if (!toast) return;

  if (titleElement) {
    titleElement.textContent = title;
  }

  if (messageElement) {
    messageElement.textContent = message;
  }

  clearTimeout(successToastTimer);

  toast.classList.add("show");

  successToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* =========================================================
   DISCARD TOAST
========================================================= */

let discardToastTimer = null;

function showDiscardToast(
  title = "Changes Discarded",
  message = "Your changes have been discarded.",
) {
  const toast = document.getElementById("discardToast");

  const titleElement = document.getElementById("discardToastTitle");

  const messageElement = document.getElementById("discardToastMessage");

  if (!toast) return;

  if (titleElement) {
    titleElement.textContent = title;
  }

  if (messageElement) {
    messageElement.textContent = message;
  }

  clearTimeout(discardToastTimer);

  toast.classList.add("show");

  discardToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

/* =========================================================
   SUCCESS TOAST CLOSE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------
     SUCCESS TOAST CLOSE
  --------------------------------------------- */

  const successCloseButton = document.getElementById("successToastClose");

  if (successCloseButton) {
    successCloseButton.addEventListener("click", () => {
      const toast = document.getElementById("successToast");

      if (toast) {
        toast.classList.remove("show");
      }

      clearTimeout(successToastTimer);
    });
  }

  /* ---------------------------------------------
     DISCARD TOAST CLOSE
  --------------------------------------------- */

  const discardCloseButton = document.getElementById("discardToastClose");

  if (discardCloseButton) {
    discardCloseButton.addEventListener("click", () => {
      const toast = document.getElementById("discardToast");

      if (toast) {
        toast.classList.remove("show");
      }

      clearTimeout(discardToastTimer);
    });
  }
});
