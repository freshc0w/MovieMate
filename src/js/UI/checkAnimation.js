// Add click event listener for checkbox that automatically disables animation
// and reloads the page.
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("show");
		} else {
			return;
		}
	});
});

export default function addToggleAnimationFnc() {
	const animationCheck = document.getElementById("check-animation");
	animationCheck.addEventListener("click", () => {
		const elements = document.querySelectorAll("div");
		if (animationCheck.checked) {
			elements.forEach((el) => {
				el.classList.add("hidden");
				observer.observe(el);
				console.log("bye");
			});
		} else {
			elements.forEach((el) => {
				console.log("hi");
				el.classList.remove("hidden");
				observer.disconnect();
			});
		}
	});
}
