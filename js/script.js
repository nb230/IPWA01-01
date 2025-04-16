// list of all right-to-left languages
const rtlLangs = ["ar", "he", "fa", "ur", "dv", "ps", "sd", "ug"];

document.addEventListener("DOMContentLoaded", () => {
    // get the users language
    const lang = navigator.language || navigator.userLanguage;
    const body = document.getElementById("mainBody");
  
    // set the language attribute of the html based on the user language
    document.documentElement.lang = lang;
  
    // check if the user has a rtl language and change the html accordingly
    if (rtlLangs.includes(lang)) {
      body.setAttribute("dir", "rtl");
    } else {
      body.setAttribute("dir", "ltr");
    }

    if (document.body.getAttribute("dir") === "rtl") {
        document.getElementById("sidebar").classList.add("order-last");
    }

    // only for quick testing
    document.getElementById("langSwitcher").addEventListener("change", (e) => {
        const lang = e.target.value;
        document.documentElement.lang = lang;
        document.body.setAttribute("dir", rtlLangs.includes(lang) ? "rtl" : "ltr");
      });
  });

  $(document).ready(function () {
    fetch("data/fake_emissions_data.json")
      .then(response => response.json())
      .then(data => {
        const tableBody = $('#emissionsTable tbody');
  
        data.forEach(entry => {
          const row = `
            <tr>
              <td>${entry.company}</td>
              <td>${entry.country}</td>
              <td>${entry.year}</td>
              <td>${entry.emissions.toLocaleString()} t</td>
            </tr>`;
          tableBody.append(row);
        });
  
        // Tabelle initialisieren
        $('#emissionsTable').DataTable({
          pageLength: 10,
          lengthChange: false,
          order: [[2, 'desc']] // Standard: sortiere nach Jahr absteigend
        });
      });
  });