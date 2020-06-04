var url = 'http://rpg.dut-info.cf/rpg/';

var app = new Vue({
  el: '#mydiv',
  data : {
    mode : 'Player',         // Contient le mode sélectionné (Player, Cheat ou MJ)
    idDrag : -1,             // Contient l'id de l'items à drag and drop
    persos,                  // Accès au tableau persos du model
    nomPerso : undefined,    // Contient le nom du perso à observer 
    perso : '',              // Contient l'objet perso à observer
    items,                   // Accès à la liste items du model
    idItem : undefined,      // Contient l'id de l'item sélectionné
    streets,                 // Accès à la liste streets du model
    idStreet : '',           // Contient l'id de la rue sélectionnée
    shops : '',              // Contient la liste des shops de la rue sélectionnée
    idShop : undefined,      // Contient l'id du shop sélectionné
    newItemName : '',        // Contient le nom de l'item à créer
    newItemType : '',        // Contient le type de l'item à créer
    newItemPrice : '',       // Contient le prix de l'item à créer
    newItemEffect : '',      // Contient l'effet de l'item à créer
    newPersoName : '',       // Contient le nom du personnage à créer
    newPersoOr : '',         // Contient le montant d'or du personnage à créer
    newStreetName : '',      // Contient le nom de la rue à créer
    newIdStreet : undefined, // Contient l'id de la rue du magasin à créer
    newShopName : '',        // Conteint le nom du nom du magasin à créer
    newShopType : '',        // Contient le type du magasin à créer
    addIdStreet : undefined, // Contient l'id de la rue du magasin où ajouter l'item
    addIdShop : undefined,   // Contient l'id du magasin où ajouter l'item
    addIdItem : undefined    // Conteint l'id de l'item à ajouter
  },
  
    mounted() {
      axios.get(url+'persos/get').then(response => {
        persos.splice(0,persos.length);
        response.data.forEach(e => {persos.push(Perso.fromObject(e))});
      })
      axios.get(url+'items/get').then(response => {
        items.splice(0,items.length);
        response.data.forEach(e => {items.push(Item.fromObject(e))});
      })
      axios.get(url+'streets/get').then(response => {
        streets.splice(0,streets.length);
        response.data.forEach(e => {streets.push(Street.fromObject(e))});
      })
    },

    computed : {
      
      player : function() {
        nom = this.nomPerso;
        for(var i=0; i<persos.length; i++) {
           if (persos[i].name == nom) {
            this.perso = persos[i];
            return true;
          }
        }
        return false;
      },

      currentStreet : function() {
        return this.streets[this.idStreet];
      },

      currentShop : function() {
      if (this.currentStreet != undefined) {
        return this.currentStreet.shops[this.idShop];
      }
      else {
        return undefined;
      }
    }
  },

  methods : {

    buy : function() {
      if (this.currentShop.items[this.idItem].price > this.perso.gold) {
        alert("Not enough gold");
      }
      else {
        let r = confirm("Voulez-vous vraiment acheter " + this.currentShop.items[this.idItem].name+" pour "+this.currentShop.items[this.idItem].price+" gold ?");
        if (r == true) {
          this.perso.buy(streets[this.idStreet].shops[this.idShop].items[this.idItem]);
          streets[this.idStreet].shops[this.idShop].items.splice(this.idItem,1);
          this.idItem=undefined;
        }
      }
    },

    createPerso : function() {
      if(this.newPersoOr == '' || Math.sign(this.newPersoOr) != 1 && Math.sign(this.newPersoOr != 0) || this.newPersoOr%1 != 0) {
        alert("L'or du personnage doit être une valeur entière suppérieur ou égale à 0");
        return;
      }
      let data = {
        name: this.newPersoName, 
        level: 1, 
        gold: parseInt(this.newPersoOr), 
        life: 50, 
        vitality: 50, 
        strength: 20, 
        armor: 0
      }
      axios.post(url+'persos/create',data).then(response => {
        if (response.data.err == 1) {
          alert("Impossible de créer le personnage");
        }
        else {
          alert("Le personnage " + this.newPersoName + " a été créé avec succès");
          this.persos.push(Perso.fromObject(response.data.data));
          this.newPersoName = '';
          this.newPersoOr = '';
        }
      })
    },

    createItem : function() {
      if (this.newItemType == '') {
        alert("Sélectionner un Type pour créer l'item");
        return;
      }
      if (this.newItemEffect[0] != 'A' && this.newItemEffect[0] != 'L' && this.newItemEffect[0] != 'S') {
        alert("L'effet doit commencer par une de ses lettres : A, L ou S");
        return;
      }
      if (this.newItemEffect[1] != '+' && this.newItemEffect[1] != '-') {
        alert("L'effet doit avoir un signe + ou - après la lettre");
        return;
      }
      if (Math.sign(this.newItemEffect.substring(2,this.newItemEffect.length)) != 1 || this.newItemEffect.substring(2,this.newItemEffect.length)%1 != 0) {
        alert("L'effet doit avoir un nombre entier possitive après le signe");
        return;
      }
      if(Math.sign(this.newItemPrice) != 1 || this.newItemPrice%1 != 0) {
        alert("Entrer un prix entier possitive pour ce nouvelle item");
        return;
      }
      let data = {
        name: this.newItemName,
        type: this.newItemType,
        price: parseInt(this.newItemPrice),
        effect: this.newItemEffect
      }
      axios.post(url+'items/create',data).then(response => {
        if (response.data.err == 1) {
          alert("Impossible de créer l'item");
        }
        else {
          alert("L'item " + this.newItemName + " à été créé avec succès");
          this.items.push(Item.fromObject(response.data.data));
          this.newItemName = '';
          this.newItemType = '';
          this.newItemPrice = '';
          this.newItemEffect = '';
        }
      })
    },

    createStreet : function() {
      let data = {
        name: this.newStreetName
      }
      axios.post(url+'streets/create',data).then(response => {
        if (response.data.err == 1) {
          alert("Impossible de créer la rue");
        }
        else {
          alert("La rue " + this.newStreetName + " a été créé avec succès");
          this.streets.push(Street.fromObject(response.data.data));
          this.newStreetName = '';
        }
      })
    },

    createShop : function() {
      if (this.newIdStreet == undefined || this.newIdStreet == 'undefined' || this.newShopType == '') {
        alert("Veuillez remplir tous les champs de saisies");
        return;
      }
      let data = {
        id: this.streets[this.newIdStreet]._id,
        name: this.newShopName,
        type: this.newShopType
      }
      axios.post(url+'shops/create',data).then(response => {
        if (response.data.err == 1) {
          alert("Impossible de créer la boutique");
        }
        else {
          alert("La boutique " + this.newShopName + " a été créée avec succès");
          this.streets[this.newIdStreet].shops.push(Shop.fromObject(response.data.data));
          this.newIdStreet = undefined;
          this.newShopName = '';
          this.newShopType = '';
        }
      })
    },

    addItem : function() {
      let data = {
        idShop: this.streets[this.addIdStreet].shops[this.addIdShop]._id,
        idItem: this.items[this.addIdItem]._id
      }
      axios.put(url+'shops/additem',data).then(response => {
        if (response.data.err == 1) {
          alert("Impossible d'ajouter l'item à la boutique");
        }
        else {
          alert("L'item " + this.items[this.addIdItem].name + " a été ajouté avec succès dans la boutique " + this.streets[this.addIdStreet].shops[this.addIdShop].name);
          let itemSelect = this.items.find(e => e.name == this.items[this.addIdItem].name);
          this.streets[this.addIdStreet].shops[this.addIdShop].items.push(itemSelect);
          this.addIdStreet = undefined;
          this.addIdShop = undefined;
          this.addIdItem = undefined;
        }
      })
    },

    dragStart(index) {
      this.idDrag = index;
    },

    dragEnd() {
      this.idDrag = -1;
    },

    drop(slot) {
      if(!this.perso.assign(this.idDrag,slot)) {return}
      let itemTab = this.perso.slots.find(e => e.name == slot);
      let data = {
        id : this.perso._id,
        slotName : slot,
        items : itemTab.items
      }
      axios.put(url+'persos/updateslot',data).then(response => {
        if (response.data.err == 1) {
          alert("Impossible de faire cette action");
        }
        else {
          alert("L'item à été equipé au personnage " + this.nomPerso);
        }
      })
    },

  cheat : function() {
      if (this.mode == "Cheat") {  
          this.mode = "Player";
      }
      else {
        this.mode = "Cheat";
      }
    },

    mj : function() {
      if (this.mode == "MJ") {  
          this.mode = "Player";
      }
      else {
        this.mode = "MJ";
      }
    },

    update : function() {
      this.perso.updateCaracs();
    },
  }
});
