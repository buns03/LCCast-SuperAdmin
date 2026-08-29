/* LCCAST - Departments Page */

document.addEventListener("DOMContentLoaded", () => {
  initializeDepartmentsTabs();
  initializeDepartmentsCards();
  initializeCreateMembers();
  initializeEditForms();
  initializeDeleteDiscardModals();
  initializeSelectionModalButtons();
  initializeDepartmentsFileUploads();
  initializeExistingMemberFiles();
  initializeCampusFilter();
  initializeSuccessToast();
  initializeValidationBindings();
});

const DEFAULT_POSITIONS = [
  "President",
  "Vice President",
  "Secretary",
  "Treasurer",
  "Auditor",
  "PRO Internal",
  "PRO External",
];

let pendingDeleteCard = null;
let pendingArchiveCard = null;
let pendingSaveAction = null;
let successToastTimeout = null;
let discardToastTimeout = null;

// =========================================================
// GLOBAL ACTION LOADING MODAL
// =========================================================

function showActionLoading(title = "Processing...", message = "") {
  const loadingModal = document.getElementById("actionLoadingModal");
  const loadingTitle = document.getElementById("actionLoadingTitle");
  const loadingMessage = document.getElementById("actionLoadingMessage");

  if (!loadingModal) return;

  if (loadingTitle) {
    loadingTitle.textContent = title;
  }

  if (loadingMessage) {
    loadingMessage.textContent =
      message || "Please wait while we process your request.";
  }

  document.body.classList.add("modal-loading");
  loadingModal.classList.add("show");
}

function hideActionLoading() {
  const loadingModal = document.getElementById("actionLoadingModal");

  if (!loadingModal) return;

  loadingModal.classList.remove("show");
  document.body.classList.remove("modal-loading");
}

// Accordions
function initializeAccordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(":scope > .accordion-header");
    const content = accordion.querySelector(":scope > .accordion-content");
    if (!header || !content) return;

    accordion.classList.contains("active")
      ? setAccordionHeight(accordion, content)
      : (content.style.maxHeight = "0px");

    header.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = accordion.classList.contains("active");

      if (isOpen) {
        accordion.classList.remove("active");
        content.style.maxHeight = "0px";
        setArrow(accordion, false);
        return;
      }

      accordions.forEach((other) => {
        if (other === accordion) return;
        other.classList.remove("active");
        const otherContent = other.querySelector(":scope > .accordion-content");
        if (otherContent) otherContent.style.maxHeight = "0px";
        setArrow(other, false);
      });

      accordion.classList.add("active");
      setArrow(accordion, true);
      requestAnimationFrame(() => setAccordionHeight(accordion, content));
    });

    const observer = new ResizeObserver(() => {
      if (!accordion.classList.contains("active")) return;
      content.style.maxHeight = content.scrollHeight + "px";
    });

    observer.observe(content);
    accordion._resizeObserver = observer;
  });
}

function setAccordionHeight(accordion, content) {
  content.style.maxHeight = accordion.classList.contains("active")
    ? content.scrollHeight + "px"
    : "0px";
}

function setArrow(accordion, open) {
  const arrow = accordion.querySelector(
    ":scope > .accordion-header .accordion-arrow",
  );
  if (!arrow) return;
  arrow.className = open
    ? "bi bi-chevron-up accordion-arrow"
    : "bi bi-chevron-down accordion-arrow";
}

// Departments Initials
function getDepartmentsInitials(name) {
  if (!name) return "";
  const words = name.trim().split(/\s+/);
  return words.length === 1
    ? words[0].substring(0, 2).toUpperCase()
    : words
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

// Update Departments Logo
function updateDepartmentsLogo(card) {
  const logoImage = card.querySelector(".departments-logo-image");
  const initials = card.querySelector(".departments-logo-initials");
  const title = card.querySelector(".departments-item-title h3");
  if (!logoImage || !initials || !title) return;

  const partyName = title.textContent.trim();
  const hasLogo =
    logoImage.src &&
    logoImage.getAttribute("src") &&
    !logoImage.src.endsWith("/images/default-departments.png");

  if (hasLogo) {
    logoImage.style.display = "block";
    initials.style.display = "none";
    return;
  }

  logoImage.style.display = "none";
  initials.textContent = getDepartmentsInitials(partyName);
  initials.style.display = "flex";
}

// Departments Cards
function initializeDepartmentsCards() {
  document
    .querySelectorAll("#existingDepartments .departments-item")
    .forEach(bindDepartmentsCard);
}

function bindDepartmentsCard(card) {
  if (!card || card.dataset.bound === "true") return;
  card.dataset.bound = "true";
  updateDepartmentsLogo(card);

  const expand = card.querySelector(".expand-departments");
  const edit = card.querySelector(".edit-departments");
  const remove = card.querySelector(".delete-departments");
  const archive = card.querySelector(".archive-departments");

  // Expand
  expand?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = card.classList.contains("show");

    allDepartmentsCards().forEach((other) => {
      if (other === card) return;
      other.classList.remove("show", "editing");
      const icon = other.querySelector(".expand-departments i");
      if (icon) icon.className = "bi bi-chevron-down";
    });

    card.classList.toggle("show", !isOpen);

    const icon = expand.querySelector("i");
    if (icon)
      icon.className = card.classList.contains("show")
        ? "bi bi-chevron-up"
        : "bi bi-chevron-down";

    refreshExisting();
  });

  // Edit
  edit?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isEditing = card.classList.contains("editing");

    allDepartmentsCards().forEach((other) => {
      if (other === card) return;
      other.classList.remove("editing", "show");
      const otherIcon = other.querySelector(".expand-departments i");
      if (otherIcon) otherIcon.className = "bi bi-chevron-down";
    });

    if (isEditing) {
      card.classList.remove("editing");
    } else {
      // Enter edit mode - hide the normal expanded details
      card.classList.remove("show");
      card.classList.add("editing");

      // Keep expand icon pointing down since details are collapsed
      const icon = card.querySelector(".expand-departments i");
      if (icon) icon.className = "bi bi-chevron-down";

      initializeEditMembers(card);
    }

    refreshExisting();
  });

  // Delete
  remove?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openDeleteModal(card);
  });

  // Archive
  archive?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    openArchiveModal(card);
  });
}

function allDepartmentsCards() {
  return document.querySelectorAll("#existingDepartments .departments-item");
}

// Create Members
function initializeCreateMembers() {
  const list = document.getElementById("createMembersList");
  const add = document.getElementById("addMemberBtn");
  if (!list || !add) return;

  DEFAULT_POSITIONS.forEach((position) =>
    addMemberRow(list, { position }, false),
  );

  add.addEventListener("click", () => {
    addMemberRow(list, { position: "Member" }, true);
    updateRemoveButtons(list);
  });
}

// Add Member Row
function addMemberRow(list, member = {}, removable = true) {
  const row = document.createElement("div");
  row.className = removable ? "member-row can-remove" : "member-row";

  const position = member.position || "Member";
  const existingPhoto = member.photo || "";
  const existingBackground = member.background || "";
  const isOtherPosition =
    !DEFAULT_POSITIONS.includes(position) && position !== "Member";

  row.innerHTML = `
        <div class="member-field-group">
            <input type="text" class="member-student-id" placeholder="Student No. / ID"
                value="${esc(member.studentId || "")}" autocomplete="off" inputmode="text">
            <small class="inline-error member-student-id-error"></small>
        </div>

        <div class="member-field-group">
            <input type="text" class="member-last-name" placeholder="Last Name" value="${esc(member.lastName || "")}">
            <small class="inline-error member-last-name-error"></small>
        </div>

        <div class="member-field-group">
            <input type="text" class="member-first-name" placeholder="First Name" value="${esc(member.firstName || "")}">
            <small class="inline-error member-first-name-error"></small>
        </div>

        <div class="member-field-group">
            <input type="text" class="member-middle-name" placeholder="Middle Name" value="${esc(member.middleName || "")}">
        </div>

        <div class="member-field-group">
            <div class="position-wrapper">
                <select class="member-position">${positionOptions(position)}</select>
                <input type="text" class="other-position-input" placeholder="Enter position"
                    value="${isOtherPosition ? esc(position) : ""}" ${isOtherPosition ? "" : "hidden"}>
                <small class="inline-error member-position-error"></small>
            </div>
        </div>

        <input type="file" class="campaign-input" accept="image/*" hidden>

        <button type="button" class="campaign-btn" title="Upload Campaign / Platform">
            <span>Campaign</span>
        </button>

        <input type="file" class="background-input"
       accept="application/pdf,image/*" hidden>

        <button type="button" class="background-btn" title="Upload Background">
            <span>Background</span>
        </button>

        <input type="file" class="photo-input" accept="image/*" hidden>

        <button type="button" class="photo-btn" title="Upload member photo">
            <i class="bi bi-person-bounding-box"></i>
            <span>Photo</span>
        </button>


        <button type="button" class="remove-member" title="Remove member">
            <i class="bi bi-x-lg"></i>
        </button>

        <div class="member-file-preview"></div>
    `;

  // Student ID / key
  const studentIdInput = row.querySelector(".member-student-id");

  studentIdInput?.addEventListener("input", () => {
    const error = row.querySelector(".member-student-id-error");
    if (studentIdInput.value.trim()) {
      error?.classList.remove("show");
      if (error) error.textContent = "";
      studentIdInput.classList.remove("input-error");
    }
  });

  studentIdInput?.addEventListener("change", async () => {
    const studentId = studentIdInput.value.trim();
    if (!studentId) return;

    // Backend lookup will go here (no request yet)
    console.log("Student ID entered:", studentId);
  });

  // Position
  const positionSelect = row.querySelector(".member-position");
  const otherInput = row.querySelector(".other-position-input");

  positionSelect.addEventListener("change", () => {
    if (positionSelect.value === "Others") {
      otherInput.hidden = false;
      otherInput.focus();
    } else {
      otherInput.hidden = true;
      otherInput.value = "";
    }
  });

  // Campaign / Platform Image
  const campaignFile = row.querySelector(".campaign-input");
  const campaignButton = row.querySelector(".campaign-btn");

  campaignButton?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (row._campaignFile || row.dataset.campaign) {
      toggleMemberFilePreview(row, "campaign");
      return;
    }

    campaignFile?.click();
  });

  campaignFile?.addEventListener("change", () => {
    const file = campaignFile.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      campaignFile.value = "";
      return;
    }

    row._campaignFile = file;
    row.dataset.campaign = URL.createObjectURL(file);

    campaignButton.classList.add("has-campaign");
    campaignButton.innerHTML = `
        <i class="bi bi-check-lg"></i>
        <span>Campaign</span>
    `;

    showMemberFilePreview(row, "campaign");
    refreshExisting();
  });

  // Background Image
  const backgroundFile = row.querySelector(".background-input");
  const backgroundButton = row.querySelector(".background-btn");

  backgroundButton?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (row._backgroundFile || row.dataset.background) {
      toggleMemberFilePreview(row, "background");
      return;
    }

    backgroundFile?.click();
  });

  backgroundFile?.addEventListener("change", async () => {
    const file = backgroundFile.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      alert("Please select an image or PDF file.");
      backgroundFile.value = "";
      return;
    }

    row._backgroundFile = file;
    row.dataset.background = URL.createObjectURL(file);

    backgroundButton.classList.add("has-background");
    backgroundButton.innerHTML = `
        <i class="bi bi-check-lg"></i>
        <span>Background</span>
    `;

    showMemberFilePreview(row, "background");
    refreshExisting();

    try {
      await processBackground(file, row);
    } catch (error) {
      console.warn("Background auto-reading failed:", error);
    }
  });

  // Photo
  const photoFile = row.querySelector(".photo-input");
  const photoButton = row.querySelector(".photo-btn");

  photoButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Existing photo -> show preview, otherwise open picker
    if (row._photoFile || row.dataset.photo) {
      toggleMemberFilePreview(row, "photo");
      return;
    }
    photoFile.click();
  });

  photoFile.addEventListener("change", () => {
    const file = photoFile.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      photoFile.value = "";
      return;
    }

    row._photoFile = file;
    row.dataset.photo = URL.createObjectURL(file);

    photoButton.classList.add("has-photo");
    photoButton.innerHTML = `<i class="bi bi-check-lg"></i><span>Photo</span>`;

    showMemberFilePreview(row, "photo");
    refreshExisting();
  });

  // Remove
  row.querySelector(".remove-member").addEventListener("click", () => {
    row.remove();
    updateRemoveButtons(list);
    refreshAccordion(list.closest(".accordion"));
  });

  list.appendChild(row);
  const existingCampaign = member.campaign || "";

  if (existingCampaign) {
    row.dataset.campaign = existingCampaign;
    row._campaignFile = null;

    campaignButton?.classList.add("has-campaign");

    if (campaignButton) {
      campaignButton.innerHTML = `
            <i class="bi bi-check-lg"></i>
            <span>Campaign</span>
        `;
    }
  }

  if (existingBackground) {
    row.dataset.background = existingBackground;
    row._backgroundFile = null;

    backgroundButton?.classList.add("has-background");

    if (backgroundButton) {
      backgroundButton.innerHTML = `
            <i class="bi bi-check-lg"></i>
            <span>Background</span>
        `;
    }
  }

  if (existingPhoto) {
    row.dataset.photo = existingPhoto;
    row._photoFile = null;

    photoButton?.classList.add("has-photo");

    if (photoButton) {
      photoButton.innerHTML = `<i class="bi bi-check-lg"></i><span>Photo</span>`;
    }
  }
}

// Student Lookup (backend-ready, not connected yet)
async function lookupStudentById(studentId) {
  if (!studentId) return null;

  /* FUTURE BACKEND:
   * const response = await fetch(`/api/students/${encodeURIComponent(studentId)}`);
   * if (!response.ok) return null;
   * return await response.json();
   */

  return null;
}

// Member File Preview
function toggleMemberFilePreview(row, type) {
  const preview = row.querySelector(".member-file-preview");
  if (!preview) return;

  const isOpen = preview.classList.contains("show");

  document.querySelectorAll(".member-file-preview.show").forEach((element) => {
    element.classList.remove("show");
  });

  if (isOpen) {
    preview.classList.remove("show");
    return;
  }

  showMemberFilePreview(row, type);
}

function showMemberFilePreview(row, type) {
  const preview = row.querySelector(".member-file-preview");
  if (!preview) return;

  let file = null;

  if (type === "campaign") {
    file = row._campaignFile || row.dataset.campaign || null;
  } else if (type === "background") {
    file = row._backgroundFile || row.dataset.background || null;
  } else if (type === "photo") {
    file = row._photoFile || row.dataset.photo || null;
  }

  // if (!file) {
  //     preview.innerHTML = `
  //         <div class="file-preview-header">
  //             <strong>${type === "photo" ? "Photo Preview" : "Resume / COC"}</strong>
  //             <button type="button" class="file-preview-close" title="Close"><i class="bi bi-x-lg"></i></button>
  //         </div>
  //         <div class="file-preview-empty">
  //             <i class="bi bi-file-earmark-x"></i>
  //             <span>No ${type === "photo" ? "photo" : "resume / COC"} uploaded.</span>
  //         </div>
  //     `;

  //     preview.classList.add("show");
  //     positionMemberFilePreview(row, preview, type)
  //     initializePreviewEvents(row, preview, type);
  //     return;
  // }

  const fileUrl = file instanceof File ? URL.createObjectURL(file) : file;

  if (type === "campaign" || type === "background" || type === "photo") {
    preview.innerHTML = `
            <div class="file-preview-header">
                <strong>
                    ${
                      type === "campaign"
                        ? "Campaign / Platform"
                        : type === "background"
                          ? "Background"
                          : "Photo Preview"
                    }
                </strong>
                <button type="button" class="file-preview-close" title="Close"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="file-preview-body photo-preview-body">
                <img
                    src="${esc(fileUrl)}"
                    alt="${
                      type === "campaign"
                        ? "Campaign / Platform"
                        : type === "background"
                          ? "Background"
                          : "Member Photo"
                    }"
                >
            </div>
            <div class="file-preview-actions">
                <button type="button" class="file-change-btn"><i class="bi bi-arrow-repeat"></i>Change</button>
                <button type="button" class="file-delete-btn"><i class="bi bi-trash"></i>Delete</button>
            </div>
        `;
  } else {
    const fileName = file instanceof File ? file.name : getFileName(file);
    const isPDF = fileName.toLowerCase().endsWith(".pdf");

    preview.innerHTML = `
            <div class="file-preview-header">
                <strong>Resume / COC</strong>
                <button type="button" class="file-preview-close" title="Close"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="file-preview-filename">
                <i class="bi ${isPDF ? "bi-file-earmark-pdf" : "bi-file-earmark-image"}"></i>
                <span>${esc(fileName)}</span>
            </div>
            <div class="file-preview-body background-preview-body">
                ${
                  isPDF
                    ? `<iframe src="${esc(fileUrl)}" title="Resume Preview"></iframe>`
                    : `<img src="${esc(fileUrl)}" alt="Resume Preview">`
                }
            </div>
            <div class="file-preview-actions">
                <button type="button" class="file-change-btn"><i class="bi bi-arrow-repeat"></i>Change</button>
                <button type="button" class="file-delete-btn"><i class="bi bi-trash"></i>Delete</button>
            </div>
        `;
  }

  preview.classList.add("show");

  preview
    .querySelector(".file-preview-close")
    ?.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMemberFilePreview(row);
    });

  preview.querySelector(".file-change-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    let input;

    if (type === "photo") {
      input = row.querySelector(".photo-input");
    } else if (type === "campaign") {
      input = row.querySelector(".campaign-input");
    } else if (type === "background") {
      input = row.querySelector(".background-input");
    }

    input?.click();
  });

  preview.querySelector(".file-delete-btn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteMemberFile(row, type);
  });

  // Wait for render so getBoundingClientRect() has correct dimensions
  requestAnimationFrame(() => positionMemberFilePreview(row, preview));
}

// Position Member File Preview
function positionMemberFilePreview(row, preview, type = "photo") {
  if (!row || !preview) return;

  // const button = row.querySelector(
  //     ".campaign-btn, .background-btn, .photo-btn, .resume-btn"
  // );

  const button = row.querySelector(`.${type}-btn`);
  if (!button) return;

  const buttonRect = button.getBoundingClientRect();
  const previewWidth = preview.offsetWidth || 340;
  const previewHeight = preview.offsetHeight || 300;
  const gap = 10;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Prefer above the row if there isn't enough room below
  let top = buttonRect.bottom + gap;
  if (top + previewHeight > viewportHeight - 15) {
    top = buttonRect.top - previewHeight - gap;
  }
  if (top < 15) top = 15;

  // Prefer aligning the right side with the button
  let left = buttonRect.right - previewWidth;
  if (left < 15) left = 15;
  if (left + previewWidth > viewportWidth - 15) {
    left = viewportWidth - previewWidth - 15;
  }

  preview.style.top = `${top}px`;
  preview.style.left = `${left}px`;
}

function deleteMemberFile(row, type) {
  if (type === "campaign") {
    const input = row.querySelector(".campaign-input");
    if (input) input.value = "";

    row._campaignFile = null;
    row.removeAttribute("data-campaign");

    const button = row.querySelector(".campaign-btn");

    if (button) {
      button.classList.remove("has-campaign");
      button.innerHTML = `
                <i class="bi bi-megaphone"></i>
                <span>Campaign</span>
            `;
    }
  } else if (type === "background") {
    const input = row.querySelector(".background-input");
    if (input) input.value = "";

    row._backgroundFile = null;
    row.removeAttribute("data-background");

    const button = row.querySelector(".background-btn");

    if (button) {
      button.classList.remove("has-background");
      button.innerHTML = `
                <i class="bi bi-image"></i>
                <span>Background</span>
            `;
    }
  } else if (type === "photo") {
    const input = row.querySelector(".photo-input");
    if (input) input.value = "";

    row._photoFile = null;
    row.removeAttribute("data-photo");

    const button = row.querySelector(".photo-btn");

    if (button) {
      button.classList.remove("has-photo");
      button.innerHTML = `
                <i class="bi bi-person-bounding-box"></i>
                <span>Photo</span>
            `;
    }
  }

  closeMemberFilePreview(row);
  refreshExisting();
}

function closeMemberFilePreview(row) {
  const preview = row.querySelector(".member-file-preview");
  if (!preview) return;
  preview.classList.remove("show");
  preview.innerHTML = "";
}

function getFileName(url) {
  try {
    return decodeURIComponent(url.split("/").pop());
  } catch {
    return "Uploaded file";
  }
}

// Position Options
function positionOptions(selected) {
  const isCustom =
    selected && !DEFAULT_POSITIONS.includes(selected) && selected !== "Member";
  const positions = [...DEFAULT_POSITIONS, "Member", "Others"];

  return positions
    .map(
      (position) => `
        <option value="${esc(position)}" ${position === selected || (position === "Others" && isCustom) ? "selected" : ""}>
            ${esc(position)}
        </option>
    `,
    )
    .join("");
}

// Remove Buttons
function updateRemoveButtons(list) {
  list.querySelectorAll(".member-row").forEach((row) => {
    const button = row.querySelector(".remove-member");
    if (button) button.style.display = "flex";
  });
}

// Resume / COC Reader
async function processBackground(file, row) {
  const backgroundButton = row.querySelector(".background-btn");
  if (!backgroundButton) return;

  const originalHTML = backgroundButton.innerHTML;
  backgroundButton.disabled = true;
  backgroundButton.classList.add("scanning");
  backgroundButton.innerHTML = `<i class="bi bi-hourglass-split"></i><span>Reading...</span>`;

  try {
    let text = "";

    if (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    ) {
      text = await extractPDFText(file);
    } else if (file.type.startsWith("image/")) {
      if (typeof Tesseract === "undefined")
        throw new Error("Tesseract is unavailable.");
      const result = await Tesseract.recognize(file, "eng");
      text = result?.data?.text || "";
    }

    if (!text.trim()) {
      alert("No readable text was detected in this resume / COC.");
      return;
    }

    console.log("Background", text);

    const data = parseBackgroundText(text);
    fillMemberFromBackground(row, data);

    backgroundButton.classList.add("has-background");
    backgroundButton.innerHTML = `<i class="bi bi-check-lg"></i><span>Background</span>`;
  } catch (error) {
    console.error("Resume reading error:", error);
    alert(
      "The resume / COC could not be read. You can still enter the information manually.",
    );
  } finally {
    backgroundButton.disabled = false;
    backgroundButton.classList.remove("scanning");

    if (!backgroundButton.classList.contains("has-background")) {
      backgroundButton.innerHTML = originalHTML;
    }
  }
}

// PDF Text Extraction
async function extractPDFText(file) {
  if (!file) throw new Error("No PDF file selected.");
  if (typeof pdfjsLib === "undefined") throw new Error("PDF.js is not loaded.");

  console.log("Opening PDF:", file.name);

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) })
    .promise;

  console.log("PDF loaded successfully. Pages:", pdf.numPages);

  let fullText = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    console.log(`Reading PDF page ${pageNumber}/${pdf.numPages}`);

    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => item.str || "")
      .join(" ")
      .trim();

    console.log(`Page ${pageNumber} text length:`, pageText.length);

    if (pageText) fullText += pageText + "\n";
  }

  return fullText.trim();
}

// OCR Scanned PDF
async function ocrPDF(file, row) {
  if (typeof pdfjsLib === "undefined") throw new Error("PDF.js is not loaded.");
  if (typeof Tesseract === "undefined")
    throw new Error("Tesseract.js is not loaded.");

  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) })
    .promise;

  let fullText = "";

  console.log("Starting OCR for", pdf.numPages, "PDF page(s)");

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    console.log(`OCR page ${pageNumber}/${pdf.numPages}`);

    const page = await pdf.getPage(pageNumber);

    // Render PDF page to canvas
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;

    // Send rendered page to Tesseract
    const result = await Tesseract.recognize(canvas, "eng", {
      logger: (message) => {
        if (message.status === "recognizing text") {
          console.log(
            `OCR page ${pageNumber}:`,
            Math.round(message.progress * 100) + "%",
          );
        }
      },
    });

    const pageText = result?.data?.text || "";
    console.log(`OCR page ${pageNumber} result:`, pageText);
    fullText += pageText + "\n";
  }

  return fullText.trim();
}

// Load PDF.js
async function loadPDFJS() {
  if (window.pdfjsLib) {
    if (window.pdfjsLib.GlobalWorkerOptions) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
    return;
  }

  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";

    script.onload = () => {
      if (!window.pdfjsLib) {
        reject(new Error("PDF.js loaded but pdfjsLib is unavailable."));
        return;
      }
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve();
    };

    script.onerror = () => reject(new Error("Unable to load PDF.js."));

    document.head.appendChild(script);
  });
}

// Departments Logo + Poster File Uploads
function initializeDepartmentsFileUploads(root = document) {
  root.querySelectorAll(".departments-file-upload").forEach((upload) => {
    if (upload.dataset.bound === "true") return;
    upload.dataset.bound = "true";

    const input = upload.querySelector('input[type="file"]');
    const button = upload.querySelector(".departments-file-btn");
    const preview = upload.querySelector(".departments-file-preview");
    if (!input || !button || !preview) return;

    // Open file picker
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const existingFile = input.files?.[0];
      if (existingFile) {
        showDepartmentsFilePreview(
          upload,
          existingFile,
          input.classList.contains("departments-logo-input"),
        );
        return;
      }

      input.click();
    });

    // File selected
    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;

      const isLogo = input.classList.contains("departments-logo-input");
      const isImage = file.type.startsWith("image/");
      const isPDF = file.type === "application/pdf";

      if (isLogo && !isImage) {
        alert("Please select an image file.");
        input.value = "";
        return;
      }

      if (!isLogo && !isImage && !isPDF) {
        alert("Please select an image or PDF file.");
        input.value = "";
        return;
      }

      showDepartmentsFilePreview(upload, file, isLogo);

      // Valid file chosen - clear any "required" error for this field
      clearInlineError(input);
    });
  });
}

function showDepartmentsFilePreview(upload, file, isLogo) {
  const preview = upload.querySelector(".departments-file-preview");
  const button = upload.querySelector(".departments-file-btn");
  const input = upload.querySelector('input[type="file"]');
  if (!preview || !button || !input) return;

  const fileURL = URL.createObjectURL(file);
  const icon =
    file.type === "application/pdf"
      ? "bi-file-earmark-pdf"
      : isLogo
        ? "bi-image"
        : "bi-file-earmark-image";

  preview.innerHTML = `
        <div class="departments-file-preview-header">
            <strong>${isLogo ? "Logo Preview" : "Poster Preview"}</strong>
            <button type="button" class="departments-file-preview-close" title="Collapse Preview" aria-label="Collapse Preview">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>

        <div class="departments-file-preview-filename">
            <i class="bi ${icon}"></i>
            <span>${file.name}</span>
        </div>

        <div class="departments-file-preview-body">
            ${
              file.type === "application/pdf"
                ? `<iframe src="${fileURL}" title="Departments file preview"></iframe>`
                : `<img src="${fileURL}" alt="Departments file preview">`
            }
        </div>

        <div class="departments-file-preview-actions">
            <button type="button" class="departments-file-change-btn"><i class="bi bi-arrow-repeat"></i>Change</button>
            <button type="button" class="departments-file-delete-btn"><i class="bi bi-trash"></i>Delete</button>
        </div>
    `;

  preview.classList.add("show");

  preview
    .querySelector(".departments-file-preview-close")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      preview.classList.remove("show");
    });

  preview
    .querySelector(".departments-file-change-btn")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      input.click();
    });

  preview
    .querySelector(".departments-file-delete-btn")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      input.value = "";
      preview.innerHTML = "";
      preview.classList.remove("show");
      button.classList.remove("has-file");
      button.innerHTML = isLogo
        ? `<i class="bi bi-image"></i><span>Upload Logo</span>`
        : `<i class="bi bi-file-earmark-image"></i><span>Upload Poster</span>`;
    });

  button.classList.add("has-file");
  button.innerHTML = isLogo
    ? `<i class="bi bi-check-lg"></i><span>Logo Uploaded</span>`
    : `<i class="bi bi-check-lg"></i><span>Poster Uploaded</span>`;
}

// Parse Resume
function parseBackgroundText(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const result = {
    studentId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    position: "",
  };

  // Student ID / School ID
  const studentIdPatterns = [
    /(?:student\s*(?:id|no|number)|school\s*(?:id|no|number)|id\s*(?:no|number)?)\s*[:#\-]?\s*([A-Z0-9][A-Z0-9\-\/]*)/i,
    /\b(20\d{2}[-\s]?\d{4,7})\b/i,
  ];

  for (const pattern of studentIdPatterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      result.studentId = match[1].trim();
      break;
    }
  }

  // Name
  const namePatterns = [
    /(?:full\s*name|student\s*name|name)\s*[:\-]\s*(.+)/i,
    /^([A-Z][A-Z\s.'-]{3,})$/m,
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      const name = match[1].trim();
      const parts = name.split(/\s+/);

      if (parts.length >= 2) {
        result.firstName = parts[0];
        result.lastName = parts[parts.length - 1];
        if (parts.length > 2) result.middleName = parts.slice(1, -1).join(" ");
        break;
      }
    }
  }

  // Position
  const positionMatch = text.match(
    /(?:position|office|running\s+for|candidate\s+for)\s*[:\-]\s*(.+)/i,
  );
  if (positionMatch?.[1])
    result.position = positionMatch[1].split("\n")[0].trim();

  return result;
}

// Fill Member From Resume
function fillMemberFromBackground(row, data) {
  if (data.studentId) {
    const studentId = row.querySelector(".member-student-id");

    if (studentId) {
      studentId.value = data.studentId;
      studentId.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
  if (data.firstName)
    row.querySelector(".member-first-name").value = data.firstName;
  if (data.middleName)
    row.querySelector(".member-middle-name").value = data.middleName;
  if (data.lastName)
    row.querySelector(".member-last-name").value = data.lastName;

  if (data.position) {
    const select = row.querySelector(".member-position");
    const other = row.querySelector(".other-position-input");

    if (
      DEFAULT_POSITIONS.includes(data.position) ||
      data.position === "Member"
    ) {
      select.value = data.position;
      other.hidden = true;
    } else {
      select.value = "Others";
      other.hidden = false;
      other.value = data.position;
    }
  }
}

// Edit Members
function initializeEditMembers(card) {
  const list = card.querySelector(".edit-members-list");
  if (!list) return;
  if (list.children.length) return;

  const members = [...card.querySelectorAll(".existing-member")].map(
    (element, index) => {
      const spans = element.querySelectorAll("span");
      const name = (spans[1]?.textContent || "").trim();
      const parts = name.split(/\s+/);

      return {
        studentId: (
          element.dataset.studentId ||
          spans[0]?.textContent ||
          ""
        ).trim(),
        firstName: parts[0] || "",
        middleName: parts.length > 2 ? parts.slice(1, -1).join(" ") : "",
        lastName: parts.length > 1 ? parts[parts.length - 1] : "",
        position: (
          spans[2]?.textContent ||
          DEFAULT_POSITIONS[index] ||
          "Member"
        ).trim(),
        campaign: element.dataset.campaign || "",
        background: element.dataset.background || "",
        photo: element.dataset.photo || "",
        resume: element.dataset.resume || "",
      };
    },
  );

  (members.length
    ? members
    : DEFAULT_POSITIONS.map((position) => ({ position }))
  ).forEach((member) => addMemberRow(list, member, false));
}

// Collect Member Data
function collectMemberData(row) {
  const positionSelect = row.querySelector(".member-position");
  const otherPosition = row.querySelector(".other-position-input");

  const position =
    positionSelect?.value === "Others"
      ? otherPosition?.value.trim() || "Member"
      : positionSelect?.value || "Member";

  return {
    studentId: row.querySelector(".member-student-id")?.value.trim() || "",
    firstName: row.querySelector(".member-first-name")?.value.trim() || "",
    middleName: row.querySelector(".member-middle-name")?.value.trim() || "",
    lastName: row.querySelector(".member-last-name")?.value.trim() || "",
    position,
    campaign: row.dataset.campaign || "",
    background: row.dataset.background || "",
    photo: row.dataset.photo || "",
  };
}

// // Validate Member Student IDs (shared by create form and every edit form)
// function validateMemberStudentIds(memberList) {
//     if (!memberList) return true;

//     let isValid = true;
//     const rows = memberList.querySelectorAll(".member-row");

//     rows.forEach(row => {
//         const studentId = row.querySelector(".member-student-id");
//         if (!studentId) return;

//         if (!studentId.value.trim()) {
//             showInlineError(studentId, "Student ID is required.");
//             isValid = false;
//         }
//     });

//     return isValid;
// }

// Edit Forms
function initializeEditForms() {
  document
    .querySelectorAll("#existingDepartments .departments-item")
    .forEach((card) => bindEditForm(card));

  // Create form
  const form = document.getElementById("createDepartmentsForm");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAllInlineErrors();

    const nameInput = document.getElementById("departmentsName");
    const schoolYearInput = document.getElementById("departmentsSchoolYear");
    const campusSelect = document.getElementById("departmentsCampus");
    const memberList = document.getElementById("createMembersList");

    let isValid = true;

    if (
      !nameInput ||
      !validateRequiredField(nameInput, "Departments name is required.")
    )
      isValid = false;
    if (
      !schoolYearInput ||
      !validateRequiredField(
        schoolYearInput,
        "Departments school year is required.",
      )
    )
      isValid = false;
    if (
      !campusSelect ||
      !validateRequiredField(campusSelect, "Please select a campus.")
    )
      isValid = false;
    if (memberList && !validateMembers(memberList)) isValid = false;

    if (!isValid) return;

    pendingSaveAction = { type: "create", form };
    openModal("saveDepartmentsModal");
  });

  // Discard
  document
    .getElementById("discardDepartments")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      openDiscardModal();
    });
}

function validateMembers(memberList) {
  let isValid = true;
  const rows = memberList.querySelectorAll(".member-row");

  rows.forEach((row) => {
    const studentId = row.querySelector(".member-student-id");
    const lastName = row.querySelector(".member-last-name");
    const firstName = row.querySelector(".member-first-name");
    const position = row.querySelector(".member-position");
    const otherPosition = row.querySelector(".other-position-input");

    if (
      studentId &&
      !validateRequiredField(studentId, "Student ID is required.")
    )
      isValid = false;
    if (lastName && !validateRequiredField(lastName, "Last name is required."))
      isValid = false;
    if (
      firstName &&
      !validateRequiredField(firstName, "First name is required.")
    )
      isValid = false;
    if (
      position &&
      !validateRequiredField(position, "Please select a position.")
    )
      isValid = false;

    if (
      position &&
      position.value === "Others" &&
      otherPosition &&
      !validateRequiredField(otherPosition, "Please enter a position.")
    ) {
      isValid = false;
    }
  });

  return isValid;
}

// Binds the edit form for ONE card. Guarded so repeat calls (e.g. after a new
// card is created) don't stack duplicate listeners.
function bindEditForm(card) {
  if (!card || card.dataset.editBound === "true") return;
  card.dataset.editBound = "true";

  const form = card.querySelector(".edit-departments-form");
  const list = card.querySelector(".edit-members-list");
  const add = card.querySelector(".edit-add-member");
  const cancel = card.querySelector(".cancel-departments-edit");
  if (!form) return;

  // Add member
  add?.addEventListener("click", (e) => {
    e.preventDefault();
    initializeEditMembers(card);
    addMemberRow(list, { position: "Member" }, true);
    updateRemoveButtons(list);
    refreshExisting();
  });

  // Cancel edit
  cancel?.addEventListener("click", (e) => {
    e.preventDefault();
    clearAllInlineErrors();
    card.classList.remove("editing", "show");

    const icon = card.querySelector(".expand-departments i");
    if (icon) icon.className = "bi bi-chevron-down";

    refreshExisting();
  });

  // Save edit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearAllInlineErrors();

    const nameInput = form.querySelector(".edit-departments-name-input");
    const schoolYearInput = form.querySelector(
      ".edit-departments-schoolyear-input",
    );
    const campusSelect = form.querySelector(".edit-departments-campus");
    const editList = form.querySelector(".edit-members-list");

    let isValid = true;

    if (
      !nameInput ||
      !validateRequiredField(nameInput, "Departments name is required.")
    )
      isValid = false;
    if (
      !schoolYearInput ||
      !validateRequiredField(
        schoolYearInput,
        "Departments school year is required.",
      )
    )
      isValid = false;
    if (
      !campusSelect ||
      !validateRequiredField(campusSelect, "Please select a campus.")
    )
      isValid = false;
    if (editList && editList.children.length && !validateMembers(editList))
      isValid = false;

    if (!isValid) return;

    pendingSaveAction = { type: "edit", card };
    openModal("saveDepartmentsModal");
  });
}

// Delete / Discard / Archive / Save Modals
function initializeDeleteDiscardModals() {
  const deleteConfirm = document.getElementById("confirmDeleteBtn");
  const archiveConfirm = document.getElementById("confirmArchiveBtn");
  const saveConfirm = document.getElementById("confirmSaveDepartmentsBtn");
  const discardConfirm = document.getElementById("confirmDiscardBtn");

  // DELETE
  deleteConfirm?.addEventListener("click", () => {
    if (!pendingDeleteCard) return;

    const card = pendingDeleteCard;
    const deletedName =
      card.querySelector(".departments-item-title h3")?.textContent.trim() ||
      "departments";

    closeModal("deleteDepartmentsModal");

    showActionLoading(
      "Deleting...",
      "Please wait while the department is being deleted.",
    );

    setTimeout(() => {
      card.remove();
      pendingDeleteCard = null;

      hideActionLoading();

      showSuccessToast("Deleted", `${deletedName} was deleted successfully.`);

      refreshExisting();
    }, 600);
  });

  // ARCHIVE
  archiveConfirm?.addEventListener("click", () => {
    if (!pendingArchiveCard) return;

    const card = pendingArchiveCard;
    const archiveName =
      card.querySelector(".departments-item-title h3")?.textContent.trim() ||
      "departments";

    closeModal("archiveDepartmentsModal");

    showActionLoading(
      "Archiving...",
      "Please wait while the department is being archived.",
    );

    setTimeout(() => {
      card.remove();
      pendingArchiveCard = null;

      hideActionLoading();

      showSuccessToast("Archived", `${archiveName} has been archived.`);

      refreshExisting();
    }, 600);
  });

  // SAVE / UPDATE
  saveConfirm?.addEventListener("click", () => {
    if (!pendingSaveAction) return;

    const action = pendingSaveAction;
    pendingSaveAction = null;

    closeModal("saveDepartmentsModal");

    showActionLoading(
      action.type === "create" ? "Saving..." : "Updating...",
      action.type === "create"
        ? "Please wait while the department is being saved."
        : "Please wait while the department is being updated.",
    );

    setTimeout(() => {
      if (action.type === "create") {
        saveNewDepartments(action.form);
      } else if (action.type === "edit") {
        saveEditedDepartments(action.card);
      }

      hideActionLoading();
    }, 600);
  });

  // DISCARD
  discardConfirm?.addEventListener("click", () => {
    closeModal("discardDepartmentsModal");

    showActionLoading(
      "Discarding...",
      "Please wait while your changes are being discarded.",
    );

    setTimeout(() => {
      resetCreateForm();
      clearAllInlineErrors();

      hideActionLoading();

      showDiscardToast("Discarded", "Your changes have been discarded.");
    }, 600);
  });

  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () =>
      closeModal(button.dataset.modalClose),
    );
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("show");
      }
    });
  });
}

function openDeleteModal(card) {
  pendingDeleteCard = card;

  const title = card
    .querySelector(".departments-item-title h3")
    ?.textContent.trim();
  const name = document.getElementById("deleteDepartmentsName");
  if (name) name.textContent = title || "this departments";

  openModal("deleteDepartmentsModal");
}

function openDiscardModal() {
  openModal("discardDepartmentsModal");
}

function openArchiveModal(card) {
  pendingArchiveCard = card;

  const title = card
    .querySelector(".departments-item-title h3")
    ?.textContent.trim();
  const name = document.getElementById("archiveDepartmentsName");
  if (name) name.textContent = title || "this departments";

  openModal("archiveDepartmentsModal");
}

function clearAllInlineErrors() {
  document.querySelectorAll(".inline-error.show").forEach((error) => {
    error.textContent = "";
    error.classList.remove("show");
  });

  document
    .querySelectorAll(
      ".form-group.has-error, .departments-file-upload.has-error, .member-row.has-error",
    )
    .forEach((group) => group.classList.remove("has-error"));
}

function showInlineError(control, message) {
  if (!control) return;

  const wrapper =
    control.closest(".form-group") ||
    control.closest(".departments-file-upload") ||
    control.closest(".member-field-group") ||
    control.closest(".member-row");
  const error =
    wrapper?.querySelector(".inline-error") ||
    document.getElementById(control.dataset.errorTarget || "");

  if (wrapper) wrapper.classList.add("has-error");
  if (error) {
    error.textContent = message;
    error.classList.add("show");
  }
}

function clearInlineError(control) {
  if (!control) return;

  const wrapper =
    control.closest(".form-group") ||
    control.closest(".departments-file-upload") ||
    control.closest(".member-field-group") ||
    control.closest(".member-row");
  const error =
    wrapper?.querySelector(".inline-error") ||
    document.getElementById(control.dataset.errorTarget || "");

  if (error) {
    error.textContent = "";
    error.classList.remove("show");
  }
  if (wrapper) wrapper.classList.remove("has-error");
}

function validateRequiredField(control, message) {
  if (!control) return false;

  const value = ["SELECT", "INPUT", "TEXTAREA"].includes(control.tagName)
    ? control.value.trim()
    : "";

  if (!value) {
    showInlineError(control, message);
    control.focus();
    return false;
  }

  clearInlineError(control);
  return true;
}

function validateRequiredFile(control, message) {
  if (!control) return false;

  const file = control.files && control.files.length > 0;
  const wrapper =
    control.closest(".departments-file-upload") ||
    control.closest(".form-group");

  if (!file) {
    if (wrapper) wrapper.classList.add("has-error");
    const target =
      wrapper?.querySelector(".inline-error") ||
      document.getElementById(control.dataset.errorTarget || "");
    if (target) {
      target.textContent = message;
      target.classList.add("show");
    }
    control.focus();
    return false;
  }

  if (wrapper) wrapper.classList.remove("has-error");
  const target =
    wrapper?.querySelector(".inline-error") ||
    document.getElementById(control.dataset.errorTarget || "");
  if (target) {
    target.textContent = "";
    target.classList.remove("show");
  }

  return true;
}

// Live Validation Bindings
// Clears inline errors as soon as a field is fixed, instead of waiting for
// the next submit. Uses delegation so it also covers rows/cards added later.
// Live Validation Bindings
function initializeValidationBindings() {
  document.addEventListener("input", (e) => {
    const target = e.target;

    // Text fields
    if (
      target.matches("#departmentsName") ||
      target.matches("#departmentsSchoolYear") ||
      target.matches(".edit-departments-name-input") ||
      target.matches(".edit-departments-schoolyear-input") ||
      target.matches(".member-student-id") ||
      target.matches(".member-last-name") ||
      target.matches(".member-first-name") ||
      target.matches(".other-position-input")
    ) {
      if (target.value.trim()) {
        clearInlineError(target);
      }
    }
  });

  document.addEventListener("change", (e) => {
    const target = e.target;

    // Select fields
    if (
      target.matches("#departmentsName") ||
      target.matches(".edit-departments-name-input") ||
      target.matches("#departmentsCampus") ||
      target.matches(".edit-departments-campus") ||
      target.matches(".member-position")
    ) {
      if (target.value) {
        clearInlineError(target);
      }
    }

    // File fields
    if (
      target.matches("#departmentsPoster") ||
      target.matches(".departments-poster-input") ||
      target.matches(".departments-logo-input")
    ) {
      if (target.files && target.files.length > 0) {
        clearInlineError(target);
      }
    }
  });
}

function saveEditedDepartments(card) {
  if (!card) return;

  const form = card.querySelector(".edit-departments-form");
  if (!form) return;

  const nameInput = form.querySelector(".edit-departments-name-input");
  const schoolYearInput = form.querySelector(
    ".edit-departments-schoolyear-input",
  );
  const campusSelect = form.querySelector(".edit-departments-campus");
  const title = card.querySelector(".departments-item-title h3");
  const descriptionDisplay = card.querySelector(".departments-description");
  const schoolYearDisplay = card.querySelector(
    ".departments-info-row:nth-child(2) span",
  );
  const campusDisplay = card.querySelector(".departments-campus span");
  const detailCampus = card.querySelector(".existing-departments-campus");

  const name = nameInput?.value.trim() || "";
  const campus = campusSelect?.value || "";
  const schoolYear = schoolYearInput?.value.trim() || "";

  const departmentLabels = {
    BSA: "BSA — Accountancy",
    BSBA: "BSBA — Business Administration",
    BAEL: "BAEL — Communication Arts",
    BSCRIM: "BSCRIM — Criminology",
    BSCE: "BSCE — Engineering",
    BSHM: "BSHM — Hospitality Management",
    BSIS: "BSIS — Information Systems",
    BSPSY: "BSPSY — Psychology",
    EDUC: "EDUC — Teacher Education",
  };

  const departmentName = departmentLabels[name] || name;

  if (title) title.textContent = departmentName;

  card.dataset.campus = campus;

  if (campusDisplay) {
    campusDisplay.textContent = campus;
  }

  if (detailCampus) {
    detailCampus.textContent = campus;
  }

  if (schoolYearDisplay) {
    schoolYearDisplay.textContent = schoolYear;
  }

  if (descriptionDisplay) {
    const descriptionInput = form.querySelector(
      'input[type="text"]:not(.edit-departments-schoolyear-input)',
    );

    descriptionDisplay.textContent =
      descriptionInput?.value.trim() || "Departments created successfully.";
  }

  updateDepartmentsLogo(card);

  card.classList.remove("editing", "show");

  const icon = card.querySelector(".expand-departments i");
  if (icon) {
    icon.className = "bi bi-chevron-down";
  }

  refreshExisting();

  showSuccessToast("Updated", `${departmentName} was updated successfully.`);
}

function saveNewDepartments(form) {
  if (!form) return;

  const name =
    document.getElementById("departmentsName")?.value.trim() ||
    "Untitled Departments";
  const departmentLabels = {
    BSA: "BSA — Accountancy",
    BSBA: "BSBA — Business Administration",
    BAEL: "BAEL — Communication Arts",
    BSCRIM: "BSCRIM — Criminology",
    BSCE: "BSCE — Engineering",
    BSHM: "BSHM — Hospitality Management",
    BSIS: "BSIS — Information Systems",
    BSPSY: "BSPSY — Psychology",
    EDUC: "EDUC — Teacher Education",
  };

  const departmentName = departmentLabels[name] || name;
  const campus =
    document.getElementById("departmentsCampus")?.value || "College";
  const schoolYear =
    document.getElementById("departmentsSchoolYear")?.value.trim() ||
    "Untitled School Year";
  const description =
    document.getElementById("departmentsDescription")?.value.trim() || "";
  const list = document.querySelector(".departments-list");
  if (!list) return;

  const newCard = document.createElement("article");
  newCard.className = "departments-item";
  newCard.dataset.campus = campus;
  newCard.innerHTML = `
        <div class="departments-item-header">
            <div class="departments-item-title">
                <div class="departments-logo-small">
                    <img class="departments-logo-image" src="/images/default-departments.png" alt="${departmentName} Logo">
                    <span class="departments-logo-initials">${getDepartmentsInitials(name)}</span>
                </div>
                <div class="departments-title-text">
                    <h3>${departmentName}</h3>
                    <span class="departments-description">${description || "Departments created successfully."}</span>
                </div>
            </div>
            <div class="departments-header-right">
                <div class="departments-campus">
                    <i class="bi bi-building"></i>
                    <span>${campus}</span>
                </div>
                <div class="departments-controls">
                    <button type="button" class="icon-btn edit-departments" title="Edit"><i class="bi bi-pencil"></i></button>
                    <button type="button" class="icon-btn archive-departments" title="Archive"><i class="bi bi-archive"></i></button>
                    <button type="button" class="icon-btn delete-departments" title="Delete"><i class="bi bi-trash"></i></button>
                    <button type="button" class="icon-btn expand-departments" title="Expand"><i class="bi bi-chevron-down"></i></button>
                </div>
            </div>
        </div>
        <section class="departments-details">
            <div class="departments-info">
                <div class="departments-expanded-content">
                    <div class="departments-poster-preview">
                        <div class="departments-preview-title"><span>Poster</span></div>
                        <div class="departments-file-preview existing-poster-preview"></div>
                    </div>
                    <div class="departments-expanded-details">
                        <div class="departments-info-row"><label>Campus:</label><span class="existing-departments-campus">${campus}</span></div>
                        <div class="departments-info-row">
                            <label>School Year:</label>
                            <span>${schoolYear}</span>
                        </div>
                        <div class="departments-info-row members-info-row"><label>Members:</label><div class="existing-member-list"></div></div>
                    </div>
                </div>
            </div>
            <section class="edit-departments-panel">
                <form class="departments-form edit-departments-form">
                    <div class="form-section">
                        <div class="form-group">
                            <label>Departments Name</label>
                            <select class="edit-departments-name-input" required>
                                <option value="">Select Department</option>

                                <option value="BSA" ${name === "BSA" ? "selected" : ""}>
                                    BSA — Accountancy
                                </option>

                                <option value="BSBA" ${name === "BSBA" ? "selected" : ""}>
                                    BSBA — Business Administration
                                </option>

                                <option value="BAEL" ${name === "BAEL" ? "selected" : ""}>
                                    BAEL — Communication Arts
                                </option>

                                <option value="BSCRIM" ${name === "BSCRIM" ? "selected" : ""}>
                                    BSCRIM — Criminology
                                </option>

                                <option value="BSCE" ${name === "BSCE" ? "selected" : ""}>
                                    BSCE — Engineering
                                </option>

                                <option value="BSHM" ${name === "BSHM" ? "selected" : ""}>
                                    BSHM — Hospitality Management
                                </option>

                                <option value="BSIS" ${name === "BSIS" ? "selected" : ""}>
                                    BSIS — Information Systems
                                </option>

                                <option value="BSPSY" ${name === "BSPSY" ? "selected" : ""}>
                                    BSPSY — Psychology
                                </option>

                                <option value="EDUC" ${name === "EDUC" ? "selected" : ""}>
                                    EDUC — Teacher Education
                                </option>
                            </select>

                            <small class="inline-error edit-departments-name-error"></small>
                        </div>
                        <div class="form-group">
                            <label>Platform / Quote</label>
                            <input type="text" value="${description || ""}">
                        </div>
                        <div class="form-group">
                            <label>School Year</label>
                            <input type="text" value="${schoolYear}" class="edit-departments-schoolyear-input">
                            <small class="inline-error edit-departments-schoolyear-error"></small>
                        </div>
                        <div class="form-group">
                            <label>Campus</label>
                            <select class="edit-departments-campus" required>
                                <option value="">Select Campus</option>
                                <option value="College" ${campus === "College" ? "selected" : ""}>College</option>
                                <option value="Muzon" ${campus === "Muzon" ? "selected" : ""}>Muzon</option>
                            </select>
                            <small class="inline-error edit-departments-campus-error"></small>
                        </div>
                        <div class="form-group">
                            <label>Departments Poster</label>
                            <div class="departments-file-upload">
                                <input type="file" class="departments-poster-input edit-poster-input" accept="image/*,.pdf,application/pdf" hidden>
                                <button type="button" class="departments-file-btn"><i class="bi bi-file-earmark-image"></i><span>Change Poster</span></button>
                                <div class="departments-file-preview"></div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Departments Logo <span class="optional-label">(Optional)</span></label>
                            <div class="departments-file-upload">
                                <input type="file" class="departments-logo-input edit-logo-input" accept="image/*" hidden>
                                <button type="button" class="departments-file-btn"><i class="bi bi-image"></i><span>Change Logo</span></button>
                                <div class="departments-file-preview"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-section members-section">
                        <div class="departments-divider"></div>
                        <h3>Members</h3>
                        <div class="members-list edit-members-list"></div>
                        <button type="button" class="add-member-btn edit-add-member"><i class="bi bi-plus-lg"></i>Add More Member</button>
                    </div>
                    <div class="form-buttons">
                        <button type="button" class="discard-btn cancel-departments-edit">Cancel</button>
                        <button type="submit" class="save-btn"><i class="bi bi-check-circle"></i>Save Changes</button>
                    </div>
                </form>
            </section>
        </section>
    `;

  list.prepend(newCard);

  // Bind only the new card - keeps every existing card's listeners intact
  bindDepartmentsCard(newCard);
  initializeDepartmentsFileUploads(newCard);
  bindEditForm(newCard);

  resetCreateForm();
  clearAllInlineErrors();
  showSuccessToast("Added", `${departmentName} was added successfully.`);
}

function resetCreateForm() {
  const form = document.getElementById("createDepartmentsForm");
  if (!form) return;

  form.reset();

  // form.reset() doesn't clear our custom preview markup - reset it manually
  document
    .querySelectorAll("#createDepartments .departments-file-upload")
    .forEach((upload) => {
      const preview = upload.querySelector(".departments-file-preview");
      const button = upload.querySelector(".departments-file-btn");
      const isLogo = upload.querySelector(".departments-logo-input") !== null;

      if (preview) {
        preview.innerHTML = "";
        preview.classList.remove("show");
      }

      if (button) {
        button.classList.remove("has-file");
        button.innerHTML = isLogo
          ? `<i class="bi bi-image"></i><span>Upload Logo</span>`
          : `<i class="bi bi-file-earmark-image"></i><span>Upload Poster</span>`;
      }
    });

  const list = document.getElementById("createMembersList");
  if (!list) return;

  list.innerHTML = "";
  DEFAULT_POSITIONS.forEach((position) =>
    addMemberRow(list, { position }, false),
  );
}

// Generic Modal
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("show");

  if (!document.querySelector(".modal-overlay.show")) {
    document.body.classList.remove("modal-open");
  }
}

// Selection Modal Buttons
function initializeSelectionModalButtons() {
  document.querySelectorAll(".modal-footer .cancel-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      button.closest(".modal-overlay")?.classList.remove("show");
    });
  });
}

// Success Toast
function initializeSuccessToast() {
  const toast = document.getElementById("successToast");
  const closeBtn = document.getElementById("successToastClose");
  if (!toast) return;

  closeBtn?.addEventListener("click", () => hideSuccessToast());
}

function showSuccessToast(title, message) {
  const toast = document.getElementById("successToast");
  const titleEl = document.getElementById("successToastTitle");
  const messageEl = document.getElementById("successToastMessage");
  if (!toast) return;

  if (titleEl) titleEl.textContent = title || "Success";
  if (messageEl) messageEl.textContent = message || "";

  toast.classList.remove("show");
  void toast.offsetWidth; // restart CSS transition even if already visible
  toast.classList.add("show");

  clearTimeout(successToastTimeout);
  successToastTimeout = setTimeout(() => hideSuccessToast(), 4000);
}

function hideSuccessToast() {
  const toast = document.getElementById("successToast");
  if (!toast) return;
  toast.classList.remove("show");
  clearTimeout(successToastTimeout);
}

// Discard Toast
function showDiscardToast(title, message) {
  const toast = document.getElementById("successToast");
  const titleEl = document.getElementById("successToastTitle");
  const messageEl = document.getElementById("successToastMessage");

  if (!toast) return;

  if (titleEl) titleEl.textContent = title || "Discarded";
  if (messageEl) messageEl.textContent = message || "";

  toast.classList.remove("show");
  void toast.offsetWidth; // restart CSS transition
  toast.classList.add("show");

  clearTimeout(discardToastTimeout);
  discardToastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}

// Refresh Existing
function refreshExisting() {
  // Re-apply campus filter after card changes
  const filter = document.getElementById("campusFilter");

  if (!filter) return;

  const selectedCampus = filter.value;

  document
    .querySelectorAll("#existingDepartments .departments-item")
    .forEach((card) => {
      const cardCampus = card.dataset.campus || "";

      card.style.display =
        selectedCampus === "all" || cardCampus === selectedCampus ? "" : "none";
    });
}

function refreshAccordion(accordion) {
  if (!accordion) return;

  const content = accordion.querySelector(":scope > .accordion-content");
  if (!content) return;

  if (!accordion.classList.contains("active")) {
    content.style.maxHeight = "0px";
    return;
  }

  requestAnimationFrame(
    () => (content.style.maxHeight = content.scrollHeight + "px"),
  );
}

// HTML Escape
function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Close file preview when clicking outside
document.addEventListener("click", (e) => {
  if (
    e.target.closest(".member-file-preview") ||
    e.target.closest(".photo-btn") ||
    e.target.closest(".campaign-btn") ||
    e.target.closest(".background-btn") ||
    e.target.closest(".existing-member-preview") ||
    e.target.closest(".view-member-photo") ||
    e.target.closest(".view-member-background")
  ) {
    return;
  }

  document.querySelectorAll(".member-file-preview.show").forEach((preview) => {
    preview.classList.remove("show");
  });
});

// Existing Member Files
function initializeExistingMemberFiles() {
  document.querySelectorAll(".existing-member").forEach((member) => {
    const photoButton = member.querySelector(".view-member-photo");
    const resumeButton = member.querySelector(".view-member-background");

    photoButton?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showExistingMemberFile(member, "photo");
    });

    resumeButton?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showExistingMemberFile(member, "background");
    });
  });
}

function showExistingMemberFile(member, type) {
  let url = "";

  if (type === "photo") {
    url = member.dataset.photo || "";
  } else if (type === "background") {
    url = member.dataset.background || "";
  }

  if (!url) {
    showNoFileUploadedModal(type === "photo" ? "Photo" : "Background");
    return;
  }

  let preview = member.querySelector(".existing-member-preview");

  if (!preview) {
    preview = document.createElement("div");
    preview.className = "existing-member-preview";
    member.appendChild(preview);
  }

  const cleanUrl = url.split("?")[0];
  const isPDF = cleanUrl.toLowerCase().endsWith(".pdf");

  const title = type === "photo" ? "Member Photo" : "Background";

  preview.innerHTML = `
        <div class="file-preview-header">

            <strong>${title}</strong>

            <button
                type="button"
                class="existing-preview-close"
                title="Close Preview"
                aria-label="Close Preview">

                <i class="bi bi-x-lg"></i>

            </button>

        </div>

        <div class="file-preview-body">

            ${
              type === "photo"
                ? `
                        <img
                            src="${esc(url)}"
                            alt="Member Photo">
                      `
                : isPDF
                  ? `
                            <iframe
                                src="${esc(url)}"
                                title="Background Preview">
                            </iframe>
                          `
                  : `
                            <img
                                src="${esc(url)}"
                                alt="Background Preview">
                          `
            }

        </div>
    `;

  preview.classList.add("show");

  preview
    .querySelector(".existing-preview-close")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      preview.classList.remove("show");
    });
}
// No File Uploaded Modal
function showNoFileUploadedModal(fileType) {
  let modal = document.getElementById("noFileUploadedModal");

  if (!modal) {
    modal = document.createElement("div");
    modal.id = "noFileUploadedModal";
    modal.className = "modal-overlay";
    modal.innerHTML = `
            <div class="delete-modal no-file-modal">
                <div class="delete-modal-content">
                    <div class="delete-modal-icon"><i class="bi bi-file-earmark-x"></i></div>
                    <h2>No File Uploaded</h2>
                    <p>No ${fileType.toLowerCase()} has been uploaded for this member yet.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="delete-cancel-btn no-file-close">
                        <i class="bi bi-check-lg"></i>Okay
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    modal.querySelector(".no-file-close")?.addEventListener("click", () => {
      modal.classList.remove("show");
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("show");
    });
  }

  modal.classList.add("show");
  document.body.classList.add("modal-open");
}

// Keep preview inside viewport
function repositionOpenPreviews() {
  document.querySelectorAll(".member-file-preview.show").forEach((preview) => {
    const row = preview.closest(".member-row");
    if (!row) return;

    const button =
      row.querySelector(".campaign-btn.has-campaign") ||
      row.querySelector(".background-btn.has-background") ||
      row.querySelector(".photo-btn.has-photo");

    if (!button) return;

    const type = button.classList.contains("campaign-btn")
      ? "campaign"
      : button.classList.contains("background-btn")
        ? "background"
        : "photo";

    positionMemberFilePreview(row, preview, type);
  });
}

window.addEventListener("resize", repositionOpenPreviews);
window.addEventListener("scroll", repositionOpenPreviews, true);

// Departments Tabs
function initializeDepartmentsTabs() {
  const tabs = document.querySelectorAll(".departments-tab");
  const sections = document.querySelectorAll(".departments-section");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const section = tab.dataset.section;

      tabs.forEach((item) => item.classList.remove("active"));
      sections.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      if (section === "create") {
        document.getElementById("createDepartments")?.classList.add("active");
      }

      if (section === "existing") {
        document.getElementById("existingDepartments")?.classList.add("active");
      }
    });
  });
}

function initializeCampusFilter() {
  const filter = document.getElementById("campusFilter");
  if (!filter) return;

  filter.addEventListener("change", () => {
    const selectedCampus = filter.value;
    const cards = document.querySelectorAll(
      "#existingDepartments .departments-item",
    );

    cards.forEach((card) => {
      const cardCampus = card.dataset.campus || "";
      card.style.display =
        selectedCampus === "all" || cardCampus === selectedCampus ? "" : "none";
    });
  });
}

function initializePosterUploads() {
  const inputs = document.querySelectorAll(".departments-poster-input");

  inputs.forEach((input) => {
    const upload = input.closest(".departments-poster-upload");
    if (!upload) return;

    const button = upload.querySelector(".departments-poster-btn");
    const nameDisplay = upload.querySelector(".departments-poster-name");
    if (!button) return;

    button.addEventListener("click", () => input.click());

    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;

      const isImage = file.type.startsWith("image/");
      const isPdf = file.type === "application/pdf";

      if (!isImage && !isPdf) {
        alert("Please select an image or PDF file.");
        input.value = "";
        if (nameDisplay) nameDisplay.textContent = "No poster selected";
        return;
      }

      if (nameDisplay) nameDisplay.textContent = file.name;

      const card = upload.closest(".departments-item");
      if (card) card._departmentsPosterFile = file;

      button.classList.add("has-poster");
    });
  });
}
