var app = new Vue({
  el: '#mydiv',
  data : {
    nomPerso : 'toto',  // Contient le nom du personnage à observer
    idPlayer : '',      // Contient l'id du personnage à observer
    perso : '',         // Accès au personnage sélectionné
    players,            // Accès au tableau de players dans le model
    mode : 'MJ',        // Contient le mode sélectionné (Player, Cheat ou MJ)
    items,              // Accès à la liste items du model
    shop,               // Accès à la liste shop du model
    nbItemInShop,       // Accère au nombre d'item à afficher dans la boutique
    idToBuy : '',       // Contient l'items sélectionner dans la boutique
    newItemName : '',   // Contient le nom de l'item à créer
    newItemType : '',   // Contient le type de l'item à créer
    newItemPrice : '',  // Contient le prix de l'item à créer
    newItemEffect : '', // Contient l'effet de l'item à créer
    newPersoName : '',  // Contient le nom du personnage à créer
    newPersoOr : '',    // Contient le montant d'or du personnage à créer
    idDrag : -1         // Contient l'id de l'items à drag and drop
  },
  
  computed : {
    player : function() {
      
      for(var i=0; i<players.length; i++) {
         if (players[i].name == this.nomPerso) {
          this.idPlayer = i;
          this.perso = players[i];
          return true;
        }
      }
      return false;
    }
  },
  
  methods : {
    buy : function() {

      if (shop[this.idToBuy].price > this.perso.gold) {
        alert("Not enough gold");
      }
      else {
        let r = confirm("Voulez-vous vraiment acheter " + shop[this.idToBuy].name+" pour "+shop[this.idToBuy].price+" gold ?");
        if (r == true) {
          this.perso.buy(shop[this.idToBuy]);
          shop.splice(this.idToBuy,1);
          this.idToBuy='';
          this.nbItems--;
        }
      }
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
    createItem : function() {

      if (this.newItemType == '') {
        alert("Sélectionner un Type pour créer l'item");
        return;
      }
      if (this.newItemEffect != '') {
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
      }
      if(Math.sign(this.newItemPrice) != 1 || this.newItemPrice%1 != 0) {
        alert("Entrer un prix entier possitive pour ce nouvelle item");
        return;
      }

      items.push(new Item(items.length, this.newItemName, this.newItemType, this.newItemPrice, this.newItemEffect))
      alert("L'item " + this.newItemName + " à été créer");
      this.newItemName = '';
      this.newItemType = '';
      this.newItemPrice = '';
      this.newItemEffect = '';
    },

    createPerso : function() {

      if(this.newPersoOr == '' || Math.sign(this.newPersoOr) != 1 && Math.sign(this.newPersoOr != 0) || this.newPersoOr%1 != 0) {
        alert("L'or du personnage doit être une valeur entière suppérieur ou égale à 0");
        return;
      }
      players.push(new Perso(this.newPersoName,1));
      players[this.players.length-1].gold = this.newPersoOr;
      this.newPersoName = '';
      this.newPersoOr = '';
    },

    update : function() {
      this.perso.updateCaracs();
    },

    fillShop() {
      this.shop = fillShop();
      this.idToBuy = '';
    },

    dragStart(index) {
      this.idDrag = index;
    },

    dragEnd() {
      this.idDrag = -1;
    },

    drop(slot) {
      this.perso.assign(this.idDrag,slot);
      this.perso.updateCaracs();
    }
  }
})
