(() => {
	let theme = "auto";
	try {
		const storedTheme = localStorage.getItem("valo-theme");
		if (["auto", "light", "dark"].includes(storedTheme)) {
			theme = storedTheme;
		}
	} catch {
		// The page still works when storage is unavailable.
	}
	document.documentElement.dataset.theme = theme;

	const initializeThemeControls = () => {
		const themeButtons = document.querySelectorAll("[data-theme-choice]");
		themeButtons.forEach((button) => {
			button.setAttribute(
				"aria-pressed",
				String(button.dataset.themeChoice === document.documentElement.dataset.theme),
			    );
		    });
		themeButtons.forEach((button) => {
			button.addEventListener("click", () => {
				const selectedTheme = button.dataset.themeChoice;
				document.documentElement.dataset.theme = selectedTheme;
				themeButtons.forEach((choice) => {
					choice.setAttribute("aria-pressed", String(choice === button));
				});
				try {
					localStorage.setItem("valo-theme", selectedTheme);
				} catch {
					// Theme switching still works when storage is unavailable.
				}
			});
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initializeThemeControls, { once: true });
	} else {
		initializeThemeControls();
	}
})();
