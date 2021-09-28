// All Inputs & Textarea
const empPhone = document.getElementById("emp-phone");
const empLocation = document.getElementById("emp-location"); // SELECT NOT INPUT !
const empManagement = document.getElementById("emp-management"); // SELECT NOT INPUT !
const ideaTitle = document.getElementById("idea-title");
const ideaType = document.getElementById("idea-type");
const ideaMembers = document.getElementById("idea-members");
const ideaDeails = document.getElementById("idea-deails");
const ideaAdministrationConcerned = document.getElementById(
  "idea-administration-concerned"
); // SELECT NOT INPUT!
const ideaBenefits = document.getElementById("idea-benefits");
const ideaResources = document.getElementById("idea-resources");
const ideaCost = document.getElementById("idea-cost");
const ideaAreaRadioButtons = document.getElementsByName("idea-area"); // Radio Buttons NOT NORMAL INPUT !
const ideaImplementedAnswer = document.getElementById(
  "idea-implemented-answer"
);
const ideaImplementedDetails = document.getElementById(
  "idea-implemented-details"
);
const ideaNeedJoinAnswer = document.getElementById("idea-need-join-answer");
const ideaEffectAnswer = document.getElementById("idea-effect-answer");
const ideaEffectSummary = document.getElementById("idea-effect-summary");
const ideaNotes = document.getElementById("idea-notes");

const ideaTypeControl = document.querySelectorAll("#idea-type-control span");
toggleInput(ideaTypeControl, ideaType, "single", ideaMembers);

const ideaImplementedControl = document.querySelectorAll(
  "#idea-implemented span"
);
const ideaNeedJoin = document.querySelectorAll("#idea-need-join span");
const ideaEffectControl = document.querySelectorAll("#idea-effect span");
const ideaAnswer = document.getElementById("idea-effect-answer");

toggleInput(
  ideaImplementedControl,
  ideaImplementedAnswer,
  "no",
  ideaImplementedDetails
);

changeButtonChoose(ideaNeedJoin, ideaNeedJoinAnswer);
changeButtonChoose(ideaEffectControl, ideaAnswer);

document.addEventListener("DOMContentLoaded", () => {
  CharacterLimitChange(ideaDeails, 500);
  CharacterLimitChange(ideaBenefits, 500);
  CharacterLimitChange(ideaResources, 500);
  CharacterLimitChange(ideaEffectSummary, 1000);
  CharacterLimitChange(ideaNotes, 1000);
});

const formData = localStorage.getItem("formData")
  ? JSON.parse(localStorage.getItem("formData"))
  : {};
const normalInputs = [
  empPhone,
  ideaTitle,
  ideaType,
  ideaMembers,
  ideaDeails,
  ideaBenefits,
  ideaResources,
  ideaCost,
  ideaImplementedAnswer,
  ideaImplementedDetails,
  ideaNeedJoinAnswer,
  ideaEffectAnswer,
  ideaEffectSummary,
  ideaNotes,
];
const selectElements = [
  empLocation,
  empManagement,
  ideaAdministrationConcerned,
];

normalInputs.forEach((input) => {
  input.addEventListener("keyup", ({ target }) => {
    saveLocal(input.id, target.value.trim().toLowerCase());
  });

  if (formData[input.id]) {
    input.value = formData[input.id];
  }
});

ideaAreaRadioButtons.forEach((radio) => {
  radio.addEventListener("change", (e) => {
    if (radio.checked) {
      saveLocal("idea-area", radio.value);
    }
  });

  if (formData["idea-area"] === radio.value) {
    radio.checked = true;
  }
});

selectElements.forEach((select) => {
  select.addEventListener("change", ({ target }) => {
    saveLocal(target.id, target.value);
  });

  if (formData[select.id]) {
    select.value = formData[select.id];
  }
});

hideOrShowToggle(ideaType, "single", ideaMembers);
hideOrShowToggle(ideaImplementedAnswer, "no", ideaImplementedDetails);

if (ideaType.value === "single") {
  removeClasses(ideaTypeControl);
  ideaTypeControl.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "single") {
      btn.classList.add("active");
    }
  });
} else {
  removeClasses(ideaTypeControl);
  ideaTypeControl.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "with team") {
      btn.classList.add("active");
    }
  });
}

if (ideaImplementedAnswer.value === "no") {
  removeClasses(ideaImplementedControl);
  ideaImplementedControl.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "no") {
      btn.classList.add("active");
    }
  });
} else {
  removeClasses(ideaImplementedControl);
  ideaImplementedControl.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "yes") {
      btn.classList.add("active");
    }
  });
}

if (ideaNeedJoinAnswer.value === "no") {
  removeClasses(ideaNeedJoin);
  ideaNeedJoin.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "no") {
      btn.classList.add("active");
      btn.classList.add("no");
    }
  });
} else if (ideaNeedJoinAnswer.value === "yes") {
  removeClasses(ideaNeedJoin);
  ideaNeedJoin.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "yes") {
      btn.classList.add("active");
      btn.classList.add("yes");
    }
  });
}

if (ideaEffectAnswer.value === "short term") {
  removeClasses(ideaEffectControl);
  ideaEffectControl.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "short term") {
      btn.classList.add("active");
    }
  });
} else if (ideaEffectAnswer.value === "long term") {
  removeClasses(ideaEffectControl);
  ideaEffectControl.forEach((btn) => {
    if (btn.getAttribute("data-ideaAnswer") === "long term") {
      btn.classList.add("active");
    }
  });
}

function saveLocal(name, data) {
  if (data.trim().toLowerCase() !== "") {
    formData[name] = data;
    localStorage.setItem("formData", JSON.stringify(formData));
  }
}

function toggleInput(buttons, varInput, word, toggleEle) {
  changeButtonChoose(buttons, varInput);
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      hideOrShowToggle(varInput, word, toggleEle);
      saveLocal(ideaType.id, ideaType.value);
      saveLocal(ideaImplementedAnswer.id, ideaImplementedAnswer.value);
    });
  });
}

function changeButtonChoose(buttons, varInput) {
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      removeClasses(buttons);

      switch (btn.getAttribute("data-ideaAnswer")) {
        case "no":
          btn.classList.add("no");
          break;
        case "yes":
          btn.classList.add("yes");
          break;
        case "short term":
        case "long term":
          btn.classList.add("effect");
          break;
      }

      btn.classList.add("active");

      varInput.value = btn.getAttribute("data-ideaAnswer");
      saveLocal(ideaNeedJoinAnswer.id, ideaNeedJoinAnswer.value);
      saveLocal(ideaEffectAnswer.id, ideaEffectAnswer.value);
    });
  });
}

function removeClasses(items) {
  items.forEach((item) => {
    item.classList.remove("active");
  });
}

function CharacterLimitChange(element, limit) {
  element.addEventListener("keyup", ({ target }) => {
    element.nextElementSibling.querySelector("span").textContent =
      limit - target.value.trim().length;
  });

  element.nextElementSibling.querySelector("span").textContent =
    limit - element.value.trim().length;
}

function hideOrShowToggle(varInput, word, toggleEle) {
  if (varInput.value.trim().toLowerCase() === word) {
    toggleEle.parentElement.style.display = "none";
    toggleEle.required = false;

    ideaMembers.value = "";
    formData[ideaMembers.id] = ideaMembers.value;
    localStorage.setItem("formData", JSON.stringify(formData));

    ideaImplementedDetails.value = "";
    formData[ideaImplementedDetails.id] = ideaImplementedDetails.value;
    localStorage.setItem("formData", JSON.stringify(formData));
  } else {
    toggleEle.parentElement.style.display = "block";
    toggleEle.required = true;
  }
}
