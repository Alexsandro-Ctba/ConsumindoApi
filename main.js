import api from "./api";

class consume_api {
  constructor() {
    this.data = [];
    this.formPage = document.getElementById("form");
    this.ulPage = document.getElementById("list-ul");
    this.inputPage = document.querySelector("input[name=user]");

    this.registerEvent();
  }

  registerEvent() {
    this.formPage.onsubmit = (event) => this.addData(event);
  }

  setLoad(loading = true) {
    if (loading === true) {
      let load = document.createElement("img");
      load.setAttribute("src", "200.gif");
      load.setAttribute("id", "loading");
      this.ulPage.appendChild(load);
    } else {
      document.getElementById("loading").remove();
    }
  }

  async addData(event) {
    event.preventDefault();

    const userPage = this.inputPage.value;

    if (userPage.lenght === 0) return;
    this.setLoad();
    try {
      const response = await api.get(`/users/${userPage}`);
      const {
        avatar_url,
        name,
        bio,
        company,
        location,
        public_repos,
        html_url,
        blog,
      } = response.data;

      this.data.push({
        avatar_url,
        name,
        bio,
        company,
        location,
        public_repos,
        html_url,
        blog,
      });

      this.inputPage.value = "";
      this.inputPage.blur();
      this.renderPage();
    } catch (error) {
      alert("Usuario não localizado...");
     this.inputPage.value ='';
     
    }
    this.setLoad(false);
  }

  renderPage() {
    this.ulPage.innerHTML = "";
    this.data.forEach((page) => {
      let imgPerfil = document.createElement("img");
      imgPerfil.setAttribute("src", page.avatar_url);

      let namePerfil = document.createElement("strong");
      namePerfil.appendChild(document.createTextNode(page.name));

      let descPerfil = document.createElement("p");
      descPerfil.appendChild(document.createTextNode(page.bio));

      let comPerfil = document.createElement("p");
      comPerfil.appendChild(document.createTextNode(page.company));

      let locPerfil = document.createElement("p");
      locPerfil.appendChild(document.createTextNode(page.location));

      let repPerfil = document.createElement("p");
      repPerfil.appendChild(
        document.createTextNode("Repositorios: " + page.public_repos)
      );

      let linkPerfil = document.createElement("a");
      linkPerfil.setAttribute("target", "_blank");
      linkPerfil.setAttribute("href", page.html_url);
      linkPerfil.appendChild(document.createTextNode("Acessar Perfil"));

      let socPerfil = document.createElement("a");
      socPerfil.setAttribute("target", "_blanck");
      socPerfil.setAttribute("href", page.blog);
      socPerfil.appendChild(document.createTextNode(" | Social Professional"));

      let list_li = document.createElement("li");

      list_li.appendChild(imgPerfil);
      list_li.appendChild(namePerfil);
      list_li.appendChild(descPerfil);
      list_li.appendChild(comPerfil);
      list_li.appendChild(locPerfil);
      list_li.appendChild(repPerfil);
      list_li.appendChild(linkPerfil);
      list_li.appendChild(socPerfil);

      this.ulPage.appendChild(list_li);
    });
  }
}

new consume_api();
