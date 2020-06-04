var url = 'http://rpg.dut-info.cf/rpg/';

var app = new Vue({
  el: '#mydiv',
  data : {
    
    persos,              // Accès au tableau de persos dans le model
    nomPerso : undefined,
    perso : '',

    items,               // Accès à la liste items du model
    streets,             // Accès à la liste shop du model
    
    mode : 'Player',     // Contient le mode sélectionné (Player, Cheat ou MJ)

    idDrag : -1         // Contient l'id de l'items à drag and drop
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
    }
  },

  methods : {

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

});
