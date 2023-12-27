import "../styles/sidebar.css";

export default function ThemeBar() {
  var rootTheme = document.querySelector(":root");

  const handleThemeChange = (color) => {
    rootTheme.style.setProperty("--main_color_theme", color);
  };

  return (
    <aside className="theme_sidebar">
      <div
        className="color_theme theme_cyan"
        onClick={() => handleThemeChange("#4cc2d9")}
      />
      <div
        className="color_theme theme_pink"
        onClick={() => handleThemeChange("#e34b6c")}
      />
      <div
        className="color_theme theme_white"
        onClick={() => handleThemeChange("#ffffff")}
      />
      <div
        className="color_theme theme_purple"
        onClick={() => handleThemeChange("#6b49c9")}
      />
      <div
        className="color_theme theme_green"
        onClick={() => handleThemeChange("#2cd938")}
      />
    </aside>
  );
}
