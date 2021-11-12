<script>
import { getContext } from "svelte";

    const languages = {
        "en": "English",
        "es": "Español",
        "zh_CN": "中文（檢體）",
        "zh_TW": "中文（繁體）",
    }

    let language = getContext("language") // defaults to english

</script>

<button class="language-dropdown">
  {languages[language]}
  <img
    class="dropdown-icon"
    src="./assets/chevron-down.svg"
    alt="Select language" />
</button>