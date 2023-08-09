Vue.component("sidebar", {
    template: `
    <div class="bar">
        <div class="sidebar" :class="{ activeBar: menu }">
            <div class="view">
            <button v-on:click="menu = !menu">
                <img src="images/icons/menu.svg">
            </button>
            </div>
            <ul>
                <li v-for="(page, index) in pages"  v-bind:class="{ active: index == selectedPage }">
                    <button v-on:click="selectPage(index)">
                        <img v-bind:src="'images/icons/' + page.image">
                        <p>{{page.title}}</p>
                    </button>
                </li>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            menu: false,
            selectedPage: 0,
            pages: [{
                    title: 'Application',
                    image: 'apps.svg'
                },
                {
                    title: 'Statistics',
                    image: 'chart.svg'
                },
                {
                    title: 'Reporting',
                    image: 'alert-triangle.svg'
                },
                {
                    title: 'Calendar',
                    image: 'calendar.svg'
                },
                {
                    title: 'Messages',
                    image: 'chat-dots.svg'
                },
                {
                    title: 'Settings',
                    image: 'settings.svg'
                },
            ]
        }
    },
    methods: {
        selectPage: function (index) {
            console.log("Selected page: " + this.pages[index].title + "\n" +
                "index: " + index)
            this.$emit('actual', index)
            this.selectedPage = index;
        }
    },
    created() {
        this.selectedPage = 4;
        this.selectPage(4)
    }
});

Vue.component("user-data", {
    template:`
    <div class="user-data-settings">
        <div class="data">
            <div class="inputs">
                <p>Your name</p>
                <input type="text" v-model="name"  placeholder="Your name">
                <p>Your picture</p>
                <input type="text" v-model="profileImage" placeholder="Your picture">
                <p>Chat color</p>
                <input class="color-input" type="color" v-model="messageColor">
            </div>
            <button v-on:click="changeSettings()">
                <p>
                Add contact
                </p>
            </button>
        </div>
    </div>
    `,
    data() {
        return {
            name: 'Sagnik Saha',
            profileImage: 'images/users/me.JPG',
            messageColor: '#4545A5',
        }
    },
    methods: {
        changeSettings: function(){

        }
    },
});


Vue.component("startchat", {
    template: `
    <div class="content">
        <h2>Get started {{title}} now!</h2>
        <img src="images/gifs/chating.gif"> 
    </div>
`,
    data() {
        return {
            titles: [
                "to chat",
                "get to know",
                "have fun",
                "to associate",
            ],
            titlePaused: false,
            titleTime: 12,
            titleAdding: true,
            titleIndex: 0,
            title: "",
            titleLength: 0
        }
    },

    created() {
        this.title = this.titles[0][0];
        setInterval(this.changeTitle, 75);
    },

    methods: {
        changeTitle: function () {
            if (this.titleAdding) {
                if (this.titlePaused) {
                    if (this.titleTime > 0) {
                        this.titleTime -= 1;
                    } else {
                        this.titleTime = 12;
                        this.titleAdding = false;
                        this.titlePaused = false;
                    }
                } else {
                    this.titleLength += 1;
                }

                if (this.titleLength === this.titles[this.titleIndex].length && this.titleAdding) {
                    this.titlePaused = true;
                }
            } else {
                this.titleLength -= 1;

                if (this.titleLength === 0) {
                    this.titleAdding = true;

                    if (this.titleIndex < this.titles.length - 1) {
                        this.titleIndex += 1;
                    } else {
                        this.titleIndex = 0;
                    }
                }
            }
            this.title = this.titles[this.titleIndex].slice(0, this.titleLength);
        }
    }
});

Vue.component("settings", {
    template: `
        <div class="page-selected">
            <div class="heading">
                <h1>
                    Settings                </h1>
            </div>
            <div class="content-page">
                <user-data></user-data>
            </div>
        </div>
    `,
});


Vue.component("stats", {
    template: `
        <div class="page-selected">
           <h1>
            Statistics
           </h1>
        </div>
    `,
});
Vue.component("applications", {
    template: `
        <div class="page-selected">
           <h1>
            Apllication
           </h1>
        </div>
    `,
});
Vue.component("reports", {
    template: `
        <div class="page-selected">
           <h1>
            Reports
           </h1>
        </div>
    `,
});
Vue.component("calendar", {
    template: `
        <div class="page-selected">
           <h1>
            Calendar
           </h1>
        </div>
    `,
});




Vue.component("dialog-contact", {
    template: `
        <div class="dialog-contact">
            <div class="data">
                <div class="inputs">
                    <input type="text" v-model="nameData"  placeholder="Contact name">
                    <input type="text" v-model="imageData" placeholder="Contact image">
                    <input type="text" v-model="messageData" placeholder="message">
                    <input type="text" v-model="emojiData" placeholder="emoji">
                </div>
                <button v-on:click="addData()">
                    <p>
                    Add contact
                    </p>
                </button>
            </div>
        </div>
    `,

    data() {
        return {
            nameData: '',
            imageData: '',
            messageData: '',
            emojiData: '',
        }
    },
    methods: {
        addData: function () {
            if (this.nameData != '' || this.imageData != '') {
                this.$emit('add-contact', {
                    name: this.nameData,
                    image: this.imageData,
                    message: this.messageData,
                    emoji: this.emojiData
                });
            }
        }
    }
});


Vue.component("chat", {
    template: `
    <div class="chat-window">
        <div class="chat">
            <div class="operators">
            <div class="top">
                    <div class="header">
                        <h2>Chat</h2>
                    </div>
                    <div class="sort">
                        <button>
                            <img src="images/icons/sort.svg">
                            <p>
                                Latest
                            </p>
                        </button>
                    </div>
            </div>
            <div class="bottom">
                    <input  v-model="inputContact" type="text" placeholder="Search"/>
            </div>
            </div>
            <div class="contacts">
                <ul v-if="filteredContacts.length > 0">
                    <li v-for="(user, index) in filteredContacts" v-bind:class="{ active: index == selectedChat }">
                        <button class="contact" v-on:click="selectChat(user, index)">
                            <div class="image">
                                <img v-bind:src="user.image"> 
                            </div>
                            <div class="title">
                                <h3 v-if="user.name.length > 20">{{user.name.substr(0,20)}}...</h3>
                                <h3 v-else>{{user.name}}</h3>
                                <p v-if="user.messages[user.messages.length - 1].message.length > 20">{{user.messages[user.messages.length - 1].message.substr(0,25)}}...</p>
                                <p v-else>{{user.messages[user.messages.length - 1].message.substr(0,25)}}</p>
                            </div>
                        </button>
                    </li>
                </ul>
                <div v-else class="empty">
                    Bohužel, ve vašich kontaktech neexistuje takový kontakt.
                </div>
            </div>
        </div>
        <div class="chat-inner">
            <div class="account">
                <div class="operators">
                    <button v-on:click="newContactDialog()" class="message">
                        <p>+ NEW MESSAGE</p>
                    </button>
                    <button class="alerts">
                        <img src="images/icons/bell-notification.svg">
                    </button>
                </div>
                <div class="account-user">
                    <img class="user-image" src="images/users/me.JPG">
                    <p>Sagnik Saha</p>
                    <button>
                        <img src="images/icons/chevron-down.svg">
                    </button>
                </div>
            </div>
            <div v-if="selectedChat == null" class="chat-empty">
                <startchat></startchat>
            </div>
            <div v-else class="chat-data">
                <div class="heading-chat">
                    <img v-bind:src="usersChat[selectedChat].image">
                    <div class="title">
                        <h3>
                            {{usersChat[selectedChat].name}}
                        </h3>
                        <p v-if="usersChat[selectedChat].online == true" class="online">
                          online
                        </p>
                        <p v-else >
                            offline
                        </p>
                    </div>
                </div>
                <div class="chat-messages">
                    <ul id="chat-window">
                        <li v-for="message in usersChat[selectedChat].messages" v-bind:class="message.type">
                            <div class="image" v-if="message.type =='from'">
                                <img v-bind:src="usersChat[selectedChat].image"> 
                            </div>
                            <div class="message-content">
                                {{message.message}}
                            </div>
                            <div class="image"  v-if="message.type =='to'">
                                <img src="images/users/me.JPG"> 
                            </div>
                        </li>
                    </ul>
                    <div class="send-message-bar">
                        <input v-on:keyup.enter="sendMessage('enter',usersChat[selectedChat].emoji)" id="input-chat" type="text" placeholder="Type here...." v-model="inputChat">
                        <button class="send-button" v-on:click="sendMessage('btn',usersChat[selectedChat].emoji)">
                            <p v-if="inputChat.trim().length <= 0" class="emoji">
                                {{usersChat[selectedChat].emoji}}
                            </p>
                            <img  v-else src="images/icons/send-2.svg"> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <dialog-contact v-if="contactDialog" @add-contact="addContact"></dialog-contact>
        <button title="Zavřít okno"  v-if="contactDialog" v-on:click="contactDialog = !contactDialog" class="close-dialog">
            <img src="images/icons/close.svg"> 
        </button>
    </div>
    `,
    data() {
        return {
            menu: false,
            inputContact: '',
            inputChat: '',
            selectedChat: null,
            contactDialog: false,
            usersChat: [{
                    name: 'Ajay',
                    image: 'images/users/u1.png',
                    online: true,
                    emoji: "🍲",
                    messages: [{
                            message: 'Hi Sagnik, what is new with you?',
                            type: 'from',
                        },
                        {
                            message: 'This is my favorite quote: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quibusdam ipsum laborum! Quasi, ratione quaerat voluptatum a impedit animi alias deserunt tempore facilis voluptates dolorum eveniet ipsum, odit, numquam quae?',
                            type: 'from',
                        },
                        {
                            message: 'Never write to me again, you do not care 🐷',
                            type: 'to',
                        }
                    ]
                },
                
            ]
        }
    },
    methods: {
        selectChat: function (chat, index) {
            console.log(
                "Vybraný chat: " + chat.name + "\n" +
                "Index: " + index
            )
            this.selectedChat = index;

            // zatím jsem nepřišel na lepší řešení, kde by se nemusel
            // použít timeout, kvůli načtení chatu

            setTimeout(() => {
                var chatWindow = document.getElementById("chat-window");
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 1)
        },
        newContactDialog: function () {
            this.contactDialog = true;
        },
        addContact: function (data) {
            if(data.message != ''){
                this.usersChat.push({
                    name: data.name,
                    online: true,
                    image: data.image,
                    emoji: data.emoji ? data.emoji : '😁',
                    messages: [{
                        message: data.message,
                        type: 'to'
                    }]
                });
            } else{
                this.usersChat.push({
                    name: data.name,
                    online: true,
                    image: data.image,
                    emoji: data.emoji ? data.emoji : '😁',
                    messages: [
                        {
                            message: 'Ahoj, vítej v mé síti!',
                            type: 'to'
                        }
                    ]
                });
            }
            this.contactDialog = false;
        },
        sendMessage: function (type, emoji) {
            var shortedInput = this.inputChat.trim();

            if (type == 'enter') {
                if (shortedInput.length > 0) {
                    this.usersChat[this.selectedChat].messages.push({
                        message: this.inputChat,
                        type: 'to'
                    })
                }
            } else {
                if (shortedInput.length > 0) {
                    this.usersChat[this.selectedChat].messages.push({
                        message: this.inputChat,
                        type: 'to'
                    })
                } else {
                    this.usersChat[this.selectedChat].messages.push({
                        message: emoji,
                        type: 'to'
                    })
                }
            }

            this.inputChat = '';

            // zatím jsem nepřišel na lepší řešení, kde by se nemusel
            // použít timeout, kvůli načtení chatu

            setTimeout(() => {
                var chatWindow = document.getElementById("chat-window");
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }, 1)
        }
    },
    created() {

    },
    computed: {
        filteredContacts: function () {
            return this.usersChat.filter(data => {
                return data.name.toLowerCase().includes(this.inputContact.toLowerCase());
            })
        },
    }
});

var vue = new Vue({
    el: "#app",
    data() {
        return {
            pageSelectedToShow: 0,
        }
    },
    methods: {
        selectedPage: function (index) {
            this.pageSelectedToShow = index;
        }
    }
})