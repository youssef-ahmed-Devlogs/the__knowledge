const fileType = document.getElementsByName("file-type");
const knowledgeLibraryTyp = document.getElementsByName(
  "knowledge-library-type"
);
const domain = document.getElementsByName("domain");
const subDomain = document.getElementsByName("sub-domain");
const validationEndDate = document.getElementById("validation-end-date");

const allRadioButtons = [fileType, knowledgeLibraryTyp, domain, subDomain];

const formData = localStorage.getItem("knowlodegeFormData")
  ? JSON.parse(localStorage.getItem("knowlodegeFormData"))
  : {};

allRadioButtons.forEach((radionButton) => {
  radionButton.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (radio.checked) {
        saveLocal(radio.getAttribute("name"), radio.value);
      }
    });

    if (formData[radio.getAttribute("name")] === radio.value) {
      radio.checked = true;
    }
  });
});

function saveLocal(name, data) {
  if (data.trim().toLowerCase() !== "") {
    formData[name] = data;
    localStorage.setItem("knowlodegeFormData", JSON.stringify(formData));
  }
}
