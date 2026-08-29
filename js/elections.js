/* ==========================================================
   LCCAST — ELECTIONS PAGE
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeElectionTabs();
  initializeElectionCards();
  initializeExistingElectionSearch();

  initializeConfirmModals();
  initializeSuccessToast();
  initializeActionLoadingModal();

  initializeSelectionModal();
  initializeEditForms();
  initializeElectionCategoryRules();
  initializeEditCategoryRules();
  initializeCreateElectionSave();
  initializeDiscardElection();

  initializeElectionEmailModal();
});

/* ==========================================================
   SHARED HELPERS
========================================================== */

const $ = (id) => document.getElementById(id);

function showFieldError(field, message) {
  const formGroup = field?.closest(".form-group");
  if (!formGroup) return;
  formGroup.classList.add("has-error");
  const error = formGroup.querySelector(".selection-error");
  if (error) error.textContent = message;
}

function clearFieldError(field) {
  const formGroup = field?.closest(".form-group");
  if (!formGroup) return;
  formGroup.classList.remove("has-error");
  const error = formGroup.querySelector(".selection-error");
  if (error) error.textContent = "";
}

function clearAllElectionErrors(form) {
  form
    .querySelectorAll(".has-error")
    .forEach((el) => el.classList.remove("has-error"));
  form
    .querySelectorAll(".selection-error")
    .forEach((el) => (el.textContent = ""));
}

function showSelectionError(section, message) {
  if (!section) return;
  section.classList.add("has-error");
  const error = section.querySelector(".selection-error");
  if (error) error.textContent = message;
}

function getSelectedItems(container) {
  if (!container) return [];
  return [...container.querySelectorAll(".chip")]
    .map((chip) => chip.textContent.trim())
    .filter(Boolean);
}

function clearContainer(container, placeholder) {
  if (container)
    container.innerHTML = `<span class="placeholder">${placeholder}</span>`;
}

/* ==========================================================
   ELECTION TABS (CREATE / EXISTING)
========================================================== */

function initializeElectionTabs() {
  const tabs = document.querySelectorAll(".election-tab");
  const sections = document.querySelectorAll(".election-section");
  if (!tabs.length || !sections.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      sections.forEach((s) => s.classList.remove("active"));

      tab.classList.add("active");
      $(tab.dataset.section)?.classList.add("active");
    });
  });
}

/* ==========================================================
   ELECTION CARDS (expand / edit / archive / delete)
========================================================== */

function initializeElectionCards() {
  const cards = document.querySelectorAll("#existingElections .election-item");

  function getTitle(card) {
    return card.querySelector(".election-title h3")?.textContent.trim();
  }

  function closeOtherCards(current) {
    cards.forEach((card) => {
      if (card === current) return;
      card.classList.remove("show");
      const icon = card.querySelector(".expand-election i");
      if (icon) icon.className = "bi bi-chevron-down";
    });
  }

  cards.forEach((card) => {
    const expand = card.querySelector(".expand-election");
    const edit = card.querySelector(".edit-election");
    const archive = card.querySelector(".archive-election");
    const remove = card.querySelector(".delete-election");

    archive?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const title = getTitle(card);
      window.openArchiveModal(
        "Archive Election?",
        `Are you sure you want to archive "${title}"?`,
        () => {
          window.showActionLoading(
            "Archiving Election...",
            `Please wait while "${title}" is being archived.`,
          );

          setTimeout(() => {
            card.remove();

            window.hideActionLoading();

            window.showSuccessToast(
              "Election Archived",
              `"${title}" was archived successfully.`,
            );
          }, 1200);
        },
      );
    });

    remove?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const title = getTitle(card);
      window.openDeleteModal(
        "Delete Election?",
        `Are you sure you want to delete "${title}"? This action cannot be undone.`,
        () => {
          window.showActionLoading(
            "Deleting Election...",
            `Please wait while "${title}" is being deleted.`,
          );

          setTimeout(() => {
            card.remove();

            window.hideActionLoading();

            window.showSuccessToast(
              "Election Deleted",
              `"${title}" was deleted successfully.`,
            );
          }, 1200);
        },
      );
    });

    expand?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = card.classList.contains("show");
      closeOtherCards(card);
      card.classList.toggle("show", !isOpen);

      const icon = expand.querySelector("i");
      if (icon)
        icon.className = card.classList.contains("show")
          ? "bi bi-chevron-up"
          : "bi bi-chevron-down";
    });

    edit?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isEditing = card.classList.contains("editing");
      cards.forEach((c) => c !== card && c.classList.remove("editing"));

      if (isEditing) {
        card.classList.remove("editing");
        return;
      }

      card.classList.add("editing", "show");
      const icon = card.querySelector(".expand-election i");
      if (icon) icon.className = "bi bi-chevron-up";
    });
  });
}

/* ==========================================================
   EXISTING ELECTION SEARCH + STATUS FILTER
========================================================== */

function initializeExistingElectionSearch() {
  const searchInput = $("electionSearch");
  const clearButton = $("clearElectionSearch");
  const statusFilter = $("electionStatusFilter");
  const cards = document.querySelectorAll("#existingElections .election-item");

  if (!searchInput || !statusFilter || !cards.length) return;

  function filterElections() {
    const search = searchInput.value.toLowerCase().trim();
    const status = statusFilter.value;

    cards.forEach((card) => {
      const searchableText = [
        card.dataset.electionTitle,
        card.dataset.category,
        card.dataset.schoolYear,
        card.dataset.campus,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = !search || searchableText.includes(search);
      const matchesStatus =
        status === "all" || card.dataset.status?.toLowerCase() === status;

      card.style.display = matchesSearch && matchesStatus ? "" : "none";
    });

    if (clearButton) clearButton.hidden = !searchInput.value;
  }

  searchInput.addEventListener("input", filterElections);
  statusFilter.addEventListener("change", filterElections);
  clearButton?.addEventListener("click", () => {
    searchInput.value = "";
    filterElections();
    searchInput.focus();
  });
}

/* ==========================================================
   CONFIRM MODALS (delete / archive / save)
   One factory drives all three reusable confirm dialogs.
========================================================== */

function createConfirmModal({
  modalId,
  titleId,
  messageId,
  cancelId,
  confirmId,
  openName,
  closeName,
}) {
  const modal = $(modalId);
  if (!modal) return;

  const title = $(titleId);
  const message = $(messageId);
  const cancel = $(cancelId);
  const confirm = $(confirmId);
  let pendingAction = null;

  function open(modalTitle, modalMessage, action = null) {
    if (title) title.textContent = modalTitle;
    if (message) message.textContent = modalMessage;
    pendingAction = action;
    modal.classList.add("show");
  }

  function close() {
    modal.classList.remove("show");
    pendingAction = null;
  }

  cancel?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    close();
  });

  confirm?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (typeof pendingAction === "function") pendingAction();
    close();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) close();
  });

  window[openName] = open;
  window[closeName] = close;
}

function initializeConfirmModals() {
  createConfirmModal({
    modalId: "deleteModal",
    titleId: "deleteModalTitle",
    messageId: "deleteModalMessage",
    cancelId: "deleteCancel",
    confirmId: "deleteConfirm",
    openName: "openDeleteModal",
    closeName: "closeDeleteModal",
  });

  createConfirmModal({
    modalId: "archiveModal",
    titleId: "archiveModalTitle",
    messageId: "archiveModalMessage",
    cancelId: "archiveCancel",
    confirmId: "archiveConfirm",
    openName: "openArchiveModal",
    closeName: "closeArchiveModal",
  });

  createConfirmModal({
    modalId: "saveModal",
    titleId: "saveModalTitle",
    messageId: "saveModalMessage",
    cancelId: "saveCancel",
    confirmId: "saveConfirm",
    openName: "openSaveModal",
    closeName: "closeSaveModal",
  });
}

/* ==========================================================
   SUCCESS TOAST
========================================================== */

function initializeSuccessToast() {
  const toast = $("successToast");
  if (!toast) return;

  const title = $("successToastTitle");
  const message = $("successToastMessage");
  const close = $("successToastClose");
  let toastTimer = null;

  function show(
    toastTitle = "Success",
    toastMessage = "Changes saved successfully.",
  ) {
    if (title) title.textContent = toastTitle;
    if (message) message.textContent = toastMessage;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4000);
  }

  function hide() {
    toast.classList.remove("show");
    clearTimeout(toastTimer);
  }

  close?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    hide();
  });

  window.showSuccessToast = show;
  window.closeSuccessToast = hide;
}

/* ==========================================================
   GLOBAL ACTION LOADING MODAL
========================================================== */

function initializeActionLoadingModal() {
  const modal = $("actionLoadingModal");

  if (!modal) {
    console.error("Action loading modal #actionLoadingModal was not found.");
    return;
  }

  const title = $("actionLoadingTitle");
  const message = $("actionLoadingMessage");

  function showLoading(
    loadingTitle = "Processing...",
    loadingMessage = "Please wait while we process your request.",
  ) {
    if (title) {
      title.textContent = loadingTitle;
    }

    if (message) {
      message.textContent = loadingMessage;
    }

    modal.classList.add("show");

    // Prevent interaction with the page while processing
    document.body.classList.add("modal-loading");
  }

  function hideLoading() {
    modal.classList.remove("show");

    document.body.classList.remove("modal-loading");
  }

  window.showActionLoading = showLoading;
  window.hideActionLoading = hideLoading;
}

/* ==========================================================
   SELECTION MODAL (partylists / departments — create & edit)
========================================================== */

function initializeSelectionModal() {
  const modal = $("selectionModal");
  if (!modal) return;

  const title = $("modalTitle");
  const subtitle = $("modalSubtitle");
  const list = $("modalList");
  const preview = $("selectedPreview");
  const closeModal = $("closeModal");
  const cancelModal = $("cancelModal");
  const saveSelection = $("saveSelection");
  const searchInput = $("modalSearch");

  const database = {
    partylist: [
      { name: "Unity Party", campus: "College" },
      { name: "Progress Party", campus: "College" },
      { name: "Student Voice", campus: "Muzon" },
      { name: "Future Leaders", campus: "Muzon" },
    ],
    department: [
      { name: "BSIS", campus: "College" },
      { name: "BSBA", campus: "College" },
      { name: "BSHM", campus: "Muzon" },
      { name: "BSED", campus: "Muzon" },
      { name: "CRIM", campus: "College" },
      { name: "Nursing", campus: "College" },
    ],
  };

  let mode = "";
  let selected = [];
  let targetContainer = null;
  let selectedCampus = "";

  /* Reset selections when the create-election campus changes */
  $("electionCampus")?.addEventListener("change", (event) => {
    selectedCampus = event.target.value;
    clearContainer($("selectedPartylist"), "No partylists selected.");
    clearContainer($("selectedDepartment"), "No departments selected.");
  });

  function getSelectedText(container) {
    return getSelectedItems(container);
  }

  function getCampusFromForm(form) {
    return form?.querySelector(".edit-election-campus")?.value || "";
  }

  function openModal(type, target = null, existingItems = [], campus = "") {
    mode = type;
    targetContainer = target;
    selected = [...existingItems];
    selectedCampus = campus;

    title.textContent =
      type === "partylist" ? "Select Partylists" : "Select Departments";
    subtitle.textContent =
      type === "partylist"
        ? "Choose participating partylists."
        : "Choose participating departments.";
    searchInput.value = "";

    modal.classList.add("show");
    renderList();
    renderPreview();
  }

  function closeModalFunction() {
    modal.classList.remove("show");
    targetContainer = null;
  }

  /* --- wiring for the "select X" buttons, shared by create + edit --- */

  function wireSelectionButton(button, type, getTarget, getCampus) {
    button?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const campus = getCampus();
      const campusField =
        type === "partylist" ? $("electionCampus") : $("electionCampus");

      if (!campus) {
        showFieldError(
          button
            .closest(".edit-election-form")
            ?.querySelector(".edit-election-campus") || campusField,
          "Please select a campus first.",
        );
        return;
      }

      const target = getTarget();
      openModal(type, target, getSelectedText(target), campus);
    });
  }

  wireSelectionButton(
    $("btnPartylist"),
    "partylist",
    () => $("selectedPartylist"),
    () => $("electionCampus")?.value || "",
  );

  wireSelectionButton(
    $("btnDepartment"),
    "department",
    () => $("selectedDepartment"),
    () => $("electionCampus")?.value || "",
  );

  document.querySelectorAll(".edit-partylist-btn").forEach((button) => {
    const form = button.closest(".edit-election-form");
    wireSelectionButton(
      button,
      "partylist",
      () =>
        button.closest(".form-section")?.querySelector(".selected-container"),
      () => getCampusFromForm(form),
    );
  });

  document.querySelectorAll(".edit-department-btn").forEach((button) => {
    const form = button.closest(".edit-election-form");
    wireSelectionButton(
      button,
      "department",
      () =>
        button.closest(".form-section")?.querySelector(".selected-container"),
      () => getCampusFromForm(form),
    );
  });

  /* --- render available items --- */

  function renderList(filter = "") {
    list.innerHTML = "";
    const search = filter.toLowerCase().trim();

    const items = database[mode].filter((item) => {
      if (selectedCampus && item.campus !== selectedCampus) return false;
      return item.name.toLowerCase().includes(search);
    });

    if (items.length === 0) {
      const label = mode === "partylist" ? "partylists" : "departments";
      list.innerHTML = `<div class="modal-empty">No ${label} available for ${selectedCampus}.</div>`;
      return;
    }

    items.forEach((item) => {
      const row = document.createElement("div");
      row.className = "modal-item";
      const isSelected = selected.includes(item.name);

      row.innerHTML = `
                <span>${item.name}</span>
                <button type="button" class="add-item" ${isSelected ? "disabled" : ""}>
                    <i class="bi ${isSelected ? "bi-check-lg" : "bi-plus-lg"}"></i>
                </button>
            `;

      row.querySelector(".add-item").addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!selected.includes(item.name)) {
          selected.push(item.name);
          renderList(searchInput.value);
          renderPreview();
        }
      });

      list.appendChild(row);
    });
  }

  function renderPreview() {
    preview.innerHTML = "";

    if (selected.length === 0) {
      preview.innerHTML = `<span class="placeholder">Nothing selected.</span>`;
      return;
    }

    selected.forEach((item) => {
      const chip = document.createElement("div");
      chip.className = "chip";
      chip.innerHTML = `${item} <i class="bi bi-x-lg"></i>`;

      chip.querySelector("i").addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        selected = selected.filter((value) => value !== item);
        renderList(searchInput.value);
        renderPreview();
      });

      preview.appendChild(chip);
    });
  }

  searchInput?.addEventListener("input", () => renderList(searchInput.value));

  saveSelection?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!targetContainer) {
      closeModalFunction();
      return;
    }

    targetContainer.innerHTML = "";

    if (selected.length === 0) {
      const label = mode === "partylist" ? "partylists" : "departments";
      targetContainer.innerHTML = `<span class="placeholder">No ${label} selected.</span>`;
    } else {
      selected.forEach((item) => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = item;
        targetContainer.appendChild(chip);
      });

      const selectionGroup = targetContainer.closest(".selection-group");
      if (selectionGroup) {
        selectionGroup.classList.remove("has-error");
        const error = selectionGroup.querySelector(".selection-error");
        if (error) error.textContent = "";
      }
    }

    closeModalFunction();
  });

  closeModal?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeModalFunction();
  });

  cancelModal?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    closeModalFunction();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModalFunction();
  });
}

/* ==========================================================
   SHARED ELECTION FORM VALIDATION (create + edit)
========================================================== */

function validateElectionCore({
  titleEl,
  categoryEl,
  schoolYearEl,
  campusEl,
  startDateEl,
  endDateEl,
  partylistContainer,
  departmentContainer,
}) {
  let valid = true;

  if (!titleEl?.value.trim()) {
    showFieldError(titleEl, "Election title is required.");
    valid = false;
  }

  if (!categoryEl?.value) {
    showFieldError(categoryEl, "Please select an election category.");
    valid = false;
  }

  if (!schoolYearEl?.value.trim()) {
    showFieldError(schoolYearEl, "School year is required.");
    valid = false;
  } else if (!/^\d{4}-\d{4}$/.test(schoolYearEl.value.trim())) {
    showFieldError(schoolYearEl, "Enter a valid school year (e.g. 2026-2027).");
    valid = false;
  } else {
    const [startYear, endYear] = schoolYearEl.value
      .trim()
      .split("-")
      .map(Number);
    if (endYear !== startYear + 1) {
      showFieldError(
        schoolYearEl,
        "School year must contain consecutive years.",
      );
      valid = false;
    }
  }

  if (!campusEl?.value) {
    showFieldError(campusEl, "Please select a campus.");
    valid = false;
  }

  if (!startDateEl?.value) {
    showFieldError(startDateEl, "Start date is required.");
    valid = false;
  }

  if (!endDateEl?.value) {
    showFieldError(endDateEl, "End date is required.");
    valid = false;
  }

  if (startDateEl?.value && endDateEl?.value) {
    if (new Date(endDateEl.value) <= new Date(startDateEl.value)) {
      showFieldError(endDateEl, "End date must be later than the start date.");
      valid = false;
    }
  }

  const selectedCategory =
    categoryEl?.options[categoryEl.selectedIndex]?.textContent.trim();
  const partylists = getSelectedItems(partylistContainer);
  const departments = getSelectedItems(departmentContainer);

  if (
    selectedCategory === "Student Supreme Council" &&
    partylists.length === 0
  ) {
    showSelectionError(
      partylistContainer?.closest(".form-section"),
      "Select at least one partylist.",
    );
    valid = false;
  }

  if (selectedCategory === "Department Election" && departments.length === 0) {
    showSelectionError(
      departmentContainer?.closest(".form-section"),
      "Select at least one department.",
    );
    valid = false;
  }

  return valid;
}

/* ==========================================================
   EDIT FORMS
========================================================== */

function initializeEditForms() {
  document
    .querySelectorAll("#existingElections .election-item")
    .forEach((card) => {
      const form = card.querySelector(".edit-election-form");
      if (!form) return;

      form.querySelector(".cancel-edit")?.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        card.classList.remove("editing");
        card.classList.add("show"); // keep card open so context isn't lost

        const icon = card.querySelector(".expand-election i");
        if (icon) icon.className = "bi bi-chevron-up";
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearAllElectionErrors(form);

        const titleEl = form.querySelector('input[type="text"]');
        const categoryEl = form.querySelector(
          "select:not(.edit-election-campus)",
        );
        const schoolYearEl = form.querySelector(".edit-election-school-year");
        const campusEl = form.querySelector(".edit-election-campus");
        const [startDateEl, endDateEl] = form.querySelectorAll(
          'input[type="datetime-local"]',
        );
        const [partylistContainer, departmentContainer] = form.querySelectorAll(
          ".selected-container",
        );

        const valid = validateElectionCore({
          titleEl,
          categoryEl,
          schoolYearEl,
          campusEl,
          startDateEl,
          endDateEl,
          partylistContainer,
          departmentContainer,
        });

        if (!valid) return;

        window.openSaveModal(
          "Save Changes?",
          "Are you sure you want to save the changes to this election.",
          () => {
            const title =
              form.querySelector('input[type="text"]')?.value.trim() ||
              "Election";

            window.showActionLoading(
              "Saving Changes...",
              `Please wait while the changes to "${title}" are saved.`,
            );

            setTimeout(() => {
              // Backend save will go here later.

              card.classList.remove("editing");
              card.classList.add("show");

              const icon = card.querySelector(".expand-election i");

              if (icon) {
                icon.className = "bi bi-chevron-up";
              }

              window.hideActionLoading();

              window.showSuccessToast(
                "Changes Saved",
                "The election changes were saved successfully.",
              );
            }, 1200);
          },
        );
      });

      form.querySelectorAll("input, select").forEach((field) => {
        field.addEventListener("input", () => clearFieldError(field));
        field.addEventListener("change", () => clearFieldError(field));
      });
    });
}

/* ==========================================================
   CATEGORY SELECTION RULES (create + edit share one engine)
========================================================== */

function wireCategoryRules(
  category,
  partylistSection,
  departmentSection,
  partylistButton,
  departmentButton,
  partylistContainer,
  departmentContainer,
) {
  if (!category || !partylistSection || !departmentSection) return;

  function clearSectionError(section) {
    section.classList.remove("has-error");
    const error = section.querySelector(".selection-error");
    if (error) error.textContent = "";
  }

  function update() {
    const selectedCategory =
      category.options[category.selectedIndex]?.textContent.trim();

    if (selectedCategory === "Student Supreme Council") {
      partylistSection.classList.remove("selection-disabled");
      if (partylistButton) partylistButton.disabled = false;

      departmentSection.classList.add("selection-disabled");
      if (departmentButton) departmentButton.disabled = true;

      clearContainer(departmentContainer, "No departments selected.");
      clearSectionError(departmentSection);
    } else if (selectedCategory === "Department Election") {
      departmentSection.classList.remove("selection-disabled");
      if (departmentButton) departmentButton.disabled = false;

      partylistSection.classList.add("selection-disabled");
      if (partylistButton) partylistButton.disabled = true;

      clearContainer(partylistContainer, "No partylists selected.");
      clearSectionError(partylistSection);
    } else {
      partylistSection.classList.remove("selection-disabled");
      departmentSection.classList.remove("selection-disabled");
      if (partylistButton) partylistButton.disabled = false;
      if (departmentButton) departmentButton.disabled = false;
    }
  }

  category.addEventListener("change", update);
  update();
}

function initializeElectionCategoryRules() {
  wireCategoryRules(
    $("electionCategory"),
    $("partylistSection"),
    $("departmentSection"),
    $("btnPartylist"),
    $("btnDepartment"),
    $("selectedPartylist"),
    $("selectedDepartment"),
  );
}

function initializeEditCategoryRules() {
  document
    .querySelectorAll("#existingElections .edit-election-form")
    .forEach((form) => {
      const category = form.querySelector("select:not(.edit-election-campus)");
      const sections = form.querySelectorAll(".form-section");

      // sections[0]=Info, [1]=Schedule, [2]=Partylists, [3]=Departments
      const partylistSection = sections[2];
      const departmentSection = sections[3];
      if (!category || !partylistSection || !departmentSection) return;

      wireCategoryRules(
        category,
        partylistSection,
        departmentSection,
        partylistSection.querySelector(".edit-partylist-btn"),
        departmentSection.querySelector(".edit-department-btn"),
        partylistSection.querySelector(".selected-container"),
        departmentSection.querySelector(".selected-container"),
      );
    });
}

/* ==========================================================
   CREATE ELECTION — SAVE
========================================================== */

function initializeCreateElectionSave() {
  const form = document.querySelector("#createElection .election-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    clearAllElectionErrors(form);

    const titleEl = $("electionTitle");
    const categoryEl = $("electionCategory");
    const schoolYearEl = $("electionSchoolYear");
    const campusEl = $("electionCampus");
    const startDateEl = $("electionStartDate");
    const endDateEl = $("electionEndDate");

    const partylistSection = $("partylistSection");
    const departmentSection = $("departmentSection");

    const partylistContainer = $("selectedPartylist");
    const departmentContainer = $("selectedDepartment");

    const valid = validateElectionCore({
      titleEl,
      categoryEl,
      schoolYearEl,
      campusEl,
      startDateEl,
      endDateEl,
      partylistContainer,
      departmentContainer,
    });

    if (!valid) return;

    window.openSaveModal(
      "Save Election?",
      "Are you sure you want to save this election?",
      () => {
        window.showActionLoading(
          "Saving Election...",
          "Please wait while the election is being saved.",
        );

        setTimeout(() => {
          console.log("Election saved.");

          form.reset();

          clearContainer($("selectedPartylist"), "No partylists selected.");

          clearContainer($("selectedDepartment"), "No departments selected.");

          clearAllElectionErrors(form);

          const category = $("electionCategory");

          if (category) {
            category.value = "";
            category.dispatchEvent(new Event("change"));
          }

          window.hideActionLoading();

          window.showSuccessToast(
            "Election Saved",
            "The election was saved successfully.",
          );
        }, 1200);
      },
    );
  });

  form.querySelectorAll("input, select").forEach((field) => {
    field.addEventListener("input", () => {
      clearFieldError(field);
    });

    field.addEventListener("change", () => {
      clearFieldError(field);
    });
  });
}

/* ==========================================================
   CREATE ELECTION — DISCARD
========================================================== */

function initializeDiscardElection() {
  const discard = $("discardElection");
  const form = document.querySelector("#createElection .election-form");
  if (!discard || !form) return;

  discard.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    window.openDeleteModal(
      "Discard Election?",
      "Are you sure you want to discard this election? All entered information will be cleared.",
      () => {
        window.showActionLoading(
          "Discarding Election...",
          "Please wait while the election information is being cleared.",
        );

        setTimeout(() => {
          form.reset();

          const campusSelect = $("electionCampus");

          if (campusSelect) {
            campusSelect.value = "";
          }

          clearContainer($("selectedPartylist"), "No partylists selected.");

          clearContainer($("selectedDepartment"), "No departments selected.");

          clearAllElectionErrors(form);

          const category = $("electionCategory");

          if (category) {
            category.value = "";
            category.dispatchEvent(new Event("change"));
          }

          window.hideActionLoading();

          window.showSuccessToast(
            "Election Discarded",
            "The election information was discarded successfully.",
          );
        }, 1000);
      },
    );
  });
}

/* ==========================================================
   ELECTION EMAIL MODAL
========================================================== */

function formatScheduledEmailDate(value) {
  const date = new Date(value);
  if (isNaN(date)) return "—";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function initializeElectionEmailModal() {
  const modal = $("emailElectionModal");

  if (!modal) {
    console.error("Email modal #emailElectionModal was not found.");
    return;
  }

  console.log("Election Email Modal initialized.");

  const title = $("emailElectionTitle");
  const details = $("emailElectionDetails");
  const subtitle = $("emailElectionSubtitle");
  const close = $("closeEmailElectionModal");
  const cancel = $("cancelEmailElection");
  const confirm = $("confirmEmailElection");
  const scheduledGroup = $("scheduledEmailGroup");
  const scheduledDate = $("scheduledEmailDate");
  const cancelScheduledEmail = $("cancelScheduledEmail");
  const scheduledBanner = $("scheduledEmailBanner");
  const scheduledDisplayDate = $("scheduledEmailDisplayDate");

  let selectedElection = null;
  const scheduledEmails = new Map();

  function getElectionId(card) {
    return (
      card.dataset.electionId ||
      card.dataset.electionTitle ||
      card.querySelector(".election-title h3")?.textContent.trim()
    );
  }

  function openEmailModal(card) {
    selectedElection = card;

    const electionId = getElectionId(card);
    const electionTitle =
      card.querySelector(".election-title h3")?.textContent.trim() ||
      "Election";
    const category =
      card.dataset.category ||
      card.querySelector(".election-title small")?.textContent.trim() ||
      "";
    const schoolYear = card.dataset.schoolYear || "";
    const campus = card.dataset.campus || "";
    const schedule =
      card.querySelector(".info-card:nth-child(4)")?.textContent.trim() || "";

    const sendNowOption = modal.querySelector(
      'input[name="emailScheduleOption"][value="now"]',
    );
    const scheduleOption = modal.querySelector(
      'input[name="emailScheduleOption"][value="schedule"]',
    );
    if (sendNowOption) sendNowOption.checked = true;
    if (scheduleOption) scheduleOption.checked = false;

    if (scheduledGroup) scheduledGroup.hidden = true;
    if (scheduledDate) scheduledDate.value = "";
    if (title) title.textContent = electionTitle;
    if (subtitle)
      subtitle.textContent = `Notify eligible voters about ${electionTitle}.`;

    if (details) {
      details.innerHTML = `
                <strong>${category}</strong><br>
                School Year: ${schoolYear}<br>
                Campus: ${campus}<br>
                ${schedule}
            `;
    }

    const existingSchedule = scheduledEmails.get(electionId);
    const hasFutureSchedule =
      existingSchedule && new Date(existingSchedule) > new Date();

    if (hasFutureSchedule) {
      if (scheduledBanner) scheduledBanner.hidden = false;
      if (scheduledDisplayDate)
        scheduledDisplayDate.textContent =
          formatScheduledEmailDate(existingSchedule);
    } else {
      scheduledEmails.delete(electionId);
      if (scheduledBanner) scheduledBanner.hidden = true;
      if (scheduledDisplayDate) scheduledDisplayDate.textContent = "—";
    }

    modal.classList.add("show");
  }

  function closeEmailModal() {
    modal.classList.remove("show");
    selectedElection = null;
    if (scheduledDate) scheduledDate.value = "";
    clearFieldError(scheduledDate);
  }

  modal
    .querySelectorAll('input[name="emailScheduleOption"]')
    .forEach((option) => {
      option.addEventListener("change", () => {
        const scheduleSelected = option.value === "schedule" && option.checked;
        if (scheduledGroup) scheduledGroup.hidden = !scheduleSelected;

        if (confirm) {
          confirm.innerHTML = scheduleSelected
            ? `<i class="bi bi-calendar-check"></i> Schedule Email`
            : `<i class="bi bi-envelope"></i> Send Email`;
        }
      });
    });

  confirm?.addEventListener("click", (event) => {
    event.preventDefault();
    if (!selectedElection) return;

    const option = modal.querySelector(
      'input[name="emailScheduleOption"]:checked',
    )?.value;

    if (option === "schedule") {
      if (!scheduledDate?.value) {
        showFieldError(scheduledDate, "Please select a date and time.");
        return;
      }

      if (new Date(scheduledDate.value) <= new Date()) {
        showFieldError(
          scheduledDate,
          "Scheduled email must be set for a future date and time.",
        );
        return;
      }

      const electionId = getElectionId(selectedElection);

      if (scheduledEmails.has(electionId)) {
        window.showSuccessToast(
          "Email Already Scheduled",
          "Cancel the existing scheduled email before creating another one.",
        );
        return;
      }

      scheduledEmails.set(electionId, scheduledDate.value);

      const electionTitle =
        selectedElection
          .querySelector(".election-title h3")
          ?.textContent.trim() || "Election";

      closeEmailModal();

      window.showActionLoading(
        "Scheduling Election Email...",
        `Please wait while the email for "${electionTitle}" is being scheduled.`,
      );

      setTimeout(() => {
        window.hideActionLoading();

        window.showSuccessToast(
          "Email Scheduled",
          "The election email was scheduled successfully.",
        );
      }, 1000);

      return;
    }

    // Send now
    // Send now

    const electionTitle =
      selectedElection
        .querySelector(".election-title h3")
        ?.textContent.trim() || "Election";

    closeEmailModal();

    window.showActionLoading(
      "Sending Election Email...",
      `Please wait while the announcement for "${electionTitle}" is being sent.`,
    );

    setTimeout(() => {
      window.hideActionLoading();

      window.showSuccessToast(
        "Email Sent",
        "The election email was sent to all eligible voters.",
      );
    }, 1500);
  });

  close?.addEventListener("click", closeEmailModal);
  cancel?.addEventListener("click", closeEmailModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeEmailModal();
  });

  cancelScheduledEmail?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!selectedElection) return;

    const electionId = getElectionId(selectedElection);
    if (!scheduledEmails.has(electionId)) return;

    scheduledEmails.delete(electionId);

    window.showActionLoading(
      "Cancelling Scheduled Email...",
      "Please wait while the scheduled email is being cancelled.",
    );

    setTimeout(() => {
      if (scheduledBanner) {
        scheduledBanner.hidden = true;
      }

      if (scheduledDisplayDate) {
        scheduledDisplayDate.textContent = "—";
      }

      window.hideActionLoading();

      window.showSuccessToast(
        "Email Cancelled",
        "The scheduled election email was cancelled successfully.",
      );
    }, 1000);
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".send-election-email");

    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    const card = button.closest(".election-item");

    if (!card) {
      console.error("Send Email: Election card not found.");
      return;
    }

    openEmailModal(card);
  });

  window.openElectionEmailModal = openEmailModal;
  window.closeElectionEmailModal = closeEmailModal;
}

