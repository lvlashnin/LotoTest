import "./scss/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.querySelector(".header__burger");
  const navMenu = document.querySelector(".header__nav");

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("is-open");

      const isMenuOpen = navMenu.classList.contains("is-open");
      burgerBtn.setAttribute("aria-expanded", isMenuOpen);
    });
  }

  const openModalBtns = document.querySelectorAll(
    ".hero__button, .button--ticket"
  );
  const modal = document.querySelector("#ticket-modal");
  const closeModalBtns = document.querySelectorAll("[data-modal-close]");

  if (modal) {
    const openModal = () => {
      modal.classList.remove("is-hidden");
      document.body.style.overflow = "hidden";
      setTimeout(() => modal.classList.add("is-open"), 10);
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(() => modal.classList.add("is-hidden"), 300);
    };

    openModalBtns.forEach((btn) => {
      btn.addEventListener("click", openModal);
    });

    closeModalBtns.forEach((btn) => btn.addEventListener("click", closeModal));
  }

  const contactForm = document.querySelector(".contact__form");
  const formWrapper = document.querySelector("#contact-form-wrapper");

  if (contactForm && formWrapper) {
    const originalFormHTML = formWrapper.innerHTML;
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      let isFormValid = true;
      contactForm
        .querySelectorAll(".form__input, .form__textarea")
        .forEach((input) => {
          input.classList.remove("is-invalid");
          input.nextElementSibling.textContent = "";
          input.nextElementSibling.style.display = "none";
        });

      const name = contactForm.querySelector("#name");
      const email = contactForm.querySelector("#email");
      const message = contactForm.querySelector("#message");

      // Валідація імені
      if (name.value.trim() === "") {
        isFormValid = false;
        name.classList.add("is-invalid");
        name.nextElementSibling.textContent = "Будь ласка, введіть ваше ім'я.";
        name.nextElementSibling.style.display = "block";
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.value.trim() === "") {
        isFormValid = false;
        email.classList.add("is-invalid");
        email.nextElementSibling.textContent = "Будь ласка, введіть ваш email.";
        email.nextElementSibling.style.display = "block";
      } else if (!emailPattern.test(email.value)) {
        isFormValid = false;
        email.classList.add("is-invalid");
        email.nextElementSibling.textContent = "Введіть коректний email.";
        email.nextElementSibling.style.display = "block";
      }

      if (message.value.trim() === "") {
        isFormValid = false;
        message.classList.add("is-invalid");
        message.nextElementSibling.textContent =
          "Поле повідомлення не може бути порожнім.";
        message.nextElementSibling.style.display = "block";
      }

      if (isFormValid) {
        console.log("Форма валідна. Відправляємо mock-запит...");

        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/1"
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Mock-запит успішний. Отримані дані:", data);

          formWrapper.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; min-height: 300px; text-align: center; color: #F0F0F0;"><h2>Дякуємо!</h2><p>Ваше повідомлення успішно відправлено.</p></div>`;

          setTimeout(() => {
            formWrapper.innerHTML = originalFormHTML;
            initializeContactForm();
          }, 10000);
        } catch (error) {
          console.error("Помилка під час виконання mock-запиту:", error);
          alert("Сталася помилка під час відправки. Спробуйте ще раз.");
        }
      }
    });
  }

  function initializeContactForm() {
    const newContactForm = document.querySelector(".contact__form");
    if (newContactForm) {
      newContactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let isFormValid = true;

        newContactForm
          .querySelectorAll(".form__input, .form__textarea")
          .forEach((input) => {
            input.classList.remove("is-invalid");
            input.nextElementSibling.textContent = "";
            input.nextElementSibling.style.display = "none";
          });

        const name = newContactForm.querySelector("#name");
        const email = newContactForm.querySelector("#email");
        const message = newContactForm.querySelector("#message");

        if (name.value.trim() === "") {
          isFormValid = false;
          name.classList.add("is-invalid");
          name.nextElementSibling.textContent =
            "Будь ласка, введіть ваше ім'я.";
          name.nextElementSibling.style.display = "block";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
          isFormValid = false;
          email.classList.add("is-invalid");
          email.nextElementSibling.textContent =
            "Будь ласка, введіть ваш email.";
          email.nextElementSibling.style.display = "block";
        } else if (!emailPattern.test(email.value)) {
          isFormValid = false;
          email.classList.add("is-invalid");
          email.nextElementSibling.textContent = "Введіть коректний email.";
          email.nextElementSibling.style.display = "block";
        }

        if (message.value.trim() === "") {
          isFormValid = false;
          message.classList.add("is-invalid");
          message.nextElementSibling.textContent =
            "Поле повідомлення не може бути порожнім.";
          message.nextElementSibling.style.display = "block";
        }

        if (isFormValid) {
          console.log("Форма валідна. Відправляємо mock-запит...");

          try {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/posts/1"
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Mock-запит успішний. Отримані дані:", data);

            const formWrapper = document.querySelector("#contact-form-wrapper");
            formWrapper.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; min-height: 300px; text-align: center; color: #F0F0F0;"><h2>Дякуємо!</h2><p>Ваше повідомлення успішно відправлено.</p></div>`;

            setTimeout(() => {
              formWrapper.innerHTML = originalFormHTML;
              initializeContactForm();
            }, 5000);
          } catch (error) {
            console.error("Помилка під час виконання mock-запиту:", error);
            alert("Сталася помилка під час відправки. Спробуйте ще раз.");
          }
        }
      });
    }
  }
  initializeContactForm();

  function initializeModalForm() {
    const modalForm = document.querySelector(".modal__form");
    if (!modalForm) return;

    const modalContent = modalForm.closest(".modal__content");
    const originalModalHTML = modalContent.innerHTML;

    modalForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      let isFormValid = true;

      modalForm.querySelectorAll(".form__input").forEach((input) => {
        input.classList.remove("is-invalid");
        input.nextElementSibling.textContent = "";
        input.nextElementSibling.style.display = "none";
      });

      const name = modalForm.querySelector("#modal-name");
      const contact = modalForm.querySelector("#modal-email");

      if (name.value.trim() === "") {
        isFormValid = false;
        name.classList.add("is-invalid");
        name.nextElementSibling.textContent = "Будь ласка, введіть ваше ім'я.";
        name.nextElementSibling.style.display = "block";
      }

      if (contact.value.trim() === "") {
        isFormValid = false;
        contact.classList.add("is-invalid");
        contact.nextElementSibling.textContent =
          "Введіть ваш email або телефон.";
        contact.nextElementSibling.style.display = "block";
      }

      if (isFormValid) {
        console.log("Модальна форма валідна. Відправляємо mock-запит...");

        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/2"
          );
          if (!response.ok) {
            throw new Error(`HTTP error. status: ${response.status}`);
          }
          const data = await response.json();
          console.log("sucsess! your data:", data);

          modalContent.innerHTML = `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 200px; text-align: center; color: #F0F0F0;"><h2>Заявка прийнята!</h2><p>Ми скоро з вами зв'яжемося.</p></div>`;

          setTimeout(() => {
            const modal = document.querySelector("#ticket-modal");
            if (modal) {
              modal.classList.remove("is-open");
              document.body.style.overflow = "";
              setTimeout(() => {
                modal.classList.add("is-hidden");
                modalContent.innerHTML = originalModalHTML;
                initializeModalForm();
              }, 300);
            }
          }, 5000);
        } catch (error) {
          console.error(error);
          alert("Сталася помилка під час відправки. Спробуйте ще раз.");
        }
      }
    });
  }
  initializeModalForm();
});
