let globalData = {
  posts: [
    {
      id: 1,
      title: "Javascript 1",
      body: "Описание поста 1",
      images: "img/10.jpg",
    },
    {
      id: 2,
      title: "Javascript 2",
      body: "Описание поста 2",
      images: "img/8.jpg",
    },
    {
      id: 3,
      title: "Javascript 3",
      body: "Описание поста 3",
      images: "img/9.jpg",
    },
    {
      id: 4,
      title: "Javascript 4",
      body: "Описание поста 4",
      images: "img/9.jpg",
    },
    {
      id: 5,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/8.jpg",
    },
    {
      id: 6,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/13.jpg",
    },
    {
      id: 7,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/12.jpg",
    },
    {
      id: 8,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/13.jpg",
    },
    {
      id: 9,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/8.jpg",
    },
    {
      id: 10,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/10.jpg",
    },
    {
      id: 11,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/13.jpg",
    },
    {
      id: 12,
      title: "Javascript 5",
      body: "Lorem fugi consectetur!",
      images: "img/12.jpg",
    },
  ],
  title: "",
  body: "",
  titleHeader: "Создание поста",
  isActive: false,
  showModal: false,
  showButtonModal: true,
  images: "img/logo.png",
  style: true,
  removeElement: true,
  sort: ["Имя", "Цена", "Рейтинг"],
  catalog: [
    "Смартфоны",
    "Бытовая техника",
    "Мелкая бытовая техника",
    "Игровые приставки",
    "Наушникии аксессуары",
    "Компьютерная техника",
    "Образование",
  ],
  sortView: false,
  catalogView: false,
};

const mainRight = {
  data() {
    return globalData;
  },
  template: `<div class="menu_left">
  <div class="menu_left_content">
      <h3 @mouseenter="sortView = true"
      @click="sortView ? sortView = false : sortView = true">Cортировка</h3>
      <ul v-show="sortView">  
          <li v-for="(item, index) in sort" class="menu_left_item">  {{ item }}  </li>
      </ul>
  </div>
</div>`,
};

const mainLeft = {
  data() {
    return globalData;
  },
  template: `<div class="menu_right">
  <div class="menu_right_content">
      <div class="menu_right_item">
      <h3 @click="catalogView ? catalogView = false : catalogView = true" @mouseenter="catalogView = true">Выбрать каталог</h3>
      <ul v-show="catalogView">
        <li v-for="item in catalog">{{item}}</li>
      </ul>
      </div>
  </div>
</div>`,
};

const headerCompanent = {
  data() {
    return globalData;
  },
  template: `<header>
  <div class="wrapper">
      <div class="header_content">

        <div class="header_logo"><img src="img/logo.png" alt="logo"></div>
          <nav>
              <ul class="menu_list">
                  <li>Главная</li>
                  <li>Про нас</li>
                  <li>Контакт</li>
                  <li id="theme">Изменить тему</li>
                  <li v-show="showButtonModal" @click="showModal = true; showButtonModal = false">Create post</li>
              </ul>
          </nav>
      </div>                
  </div>
</header>`,
};

const PostForm = {
  data() {
    return globalData;
  },
  methods: {
    createPost(event) {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
        images: this.images,
      };
      if (!(this.title == "")) {
        this.posts.push(newPost);
        this.title = "";
        this.body = "";
        this.isActive = false;
        this.showModal = false;
        this.showButtonModal = true;
      } else {
        this.isActive = true;
      }
    },
  },
  template: `<div class="modal" v-show="showModal">
  <div class="modalElement wrapper">
<div class="header_form">
<h4>{{titleHeader}}</h4>
  </div>
      <form @submit.prevent class="form">
          <input type="text" v-model="title" class="input" @input="isActive = false"
              v-bind:class="{ inputFirst: isActive }" placeholder="Название">

          <textarea type="text" v-model="body" class="input" @input="isActive = false"
               placeholder="Описание"></textarea>

          <input id="inputFile" type="file" onchange="download(this)">
          <div class="btns">
          <button class="btn" @click="showModal = false; showButtonModal = true">Отмена</button>
          <button type="submit" class="btn" @click="createPost">Сохранить</button>          
          </div>
      </form>
  </div>
</div>`,
};

const PostList = {
  data() {
    return globalData;
  },
  methods: {
    remove(index) {
      this.posts.splice(index, 1);
    },
  },

  template: ` <div class="wrapper wrapper_post">
      <div class="post" v-for="(post, index) in posts">
          <div class="post-div">
              <div id="header-title"><strong>Название:</strong> {{ post.title }}

                  <div v-show="removeElement" class="removeElementTrue">
                                    <span title="Удалить" class="btnRemove" @click="removeElement = false">&#9986</span>
                  </div>
                  <div v-show="!(removeElement)" class="removeElement">
                                    <span id="removeYes" class="btnRemove" @click="remove(index); removeElement = true">&#10004</span>
                                    <span id="removeNo" class="btnRemove" @click="removeElement = true" >&#10005</span>
                  </div>
              </div>
              <div draggable="true" id="imgInfo"><img :src="post.images" :alt="post.id"></div>
              <div id="footer-title"><strong>Описание:</strong> {{ post.body }}</div>
             
          </div>
  </div>
  <!--div @click="showModal = true; showButtonModal = false" id="buttonShow" draggable="true" id="else" v-else>Создай свой первый пост</div-->
</div>
  `,
};

const App = {
  data() {
    return globalData;
  },
  components: {
    postform: PostForm,
    postlist: PostList,
    "header-companent": headerCompanent,
    "main-left": mainLeft,
    "main-right": mainRight,
  },
};

Vue.createApp(App).mount("#myapp");

function download(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    globalData.images = reader.result;
  };
}

document.getElementById("theme").addEventListener("click", (e) => {
  if (globalData.style) {
    document.documentElement.style.setProperty("--back-color", "#7effff"),
      document.documentElement.style.setProperty(
        "--box-shadow-color-first",
        "#3e3e3e"
      ),
      document.documentElement.style.setProperty(
        "--box-shadow-color-second",
        "#030303"
      ),
      document.documentElement.style.setProperty(
        "--background-color",
        "#181818"
      );
    document.documentElement.style.setProperty("--white", "#fff");
    document.documentElement.style.setProperty("--other-color", "white");
    globalData.style = false;
  } else {
    document.documentElement.style.setProperty("--back-color", "#000"),
      document.documentElement.style.setProperty(
        "--box-shadow-color-first",
        "#ffffff73"
      ),
      document.documentElement.style.setProperty(
        "--box-shadow-color-second",
        "rgba(94, 104, 121, .288)"
      ),
      document.documentElement.style.setProperty(
        "--background-color",
        "#dde1e7"
      );
    document.documentElement.style.setProperty("--white", "#000");
    document.documentElement.style.setProperty("--other-color", "teal");
    globalData.style = true;
  }
});
