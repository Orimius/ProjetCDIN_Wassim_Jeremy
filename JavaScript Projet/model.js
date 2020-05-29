var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
  {slot:'head', limit:1, types: [ 'helmet' , 'crown' ]},
  {slot:'body', limit:1, types: [ 'armor', 'clothes' ]},
  {slot:'hands', limit:2, types: [ 'weapon', 'lighter']},
  {slot:'belt', limit:3, types: [ 'weapon', 'purse']},
  {slot:'bag', limit:10, types: [ 'helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse' ]}
];

class Item {
  constructor(id, name, type, price, effect) {
    this.id = id;
    this.name = name;
    function testType(el) { return el == type;}
    let idx = itemCats.findIndex(testType);
    if (idx != -1) {
      this.type = type;
    }
    else {
      this.type = '';
    }
    if (price>=0) {
      this.price = price;
    }
    else {
      this.price = 0;
    }
    this.effect = effect;
  }
}

var items = [
  new Item(0, 'conic helmet', 'helmet', 200, 'A+10'),
  new Item(1, 'great crown of apologia', 'crown', 200, 'A+20'),
  new Item(2, 'band of joy', 'crown', 100, 'L+10'),
  new Item(3, 'leather armor', 'armor', 100, 'A+10'),
  new Item(4, 'broigne', 'armor', 200, 'A+20'),
  new Item(5, 'hauberk', 'armor', 500, 'A+40'),
  new Item(6, 'plate armor', 'armor', 1000, 'A+60'),
  new Item(7, 'tuxedo', 'clothes', 600, 'L+1'),
  new Item(8, 'cursed swimsuit', 'clothes', 10, 'A-10'),
  new Item(9, 'unicorn cosplay', 'clothes', 200, 'L+10'),
  new Item(10, 'dagger', 'weapon', 100, 'S+5'),
  new Item(11, 'cursed dagger', 'weapon', 100, 'S-5'),
  new Item(12, 'short sword', 'weapon', 200, 'S+10'),
  new Item(13, 'cursed short sword', 'weapon', 200, 'S-10'),
  new Item(14, 'long sword', 'weapon', 300, 'S+20'),
  new Item(15, 'cursed long sword', 'weapon', 300, 'S-20'),
  new Item(16, 'axe', 'weapon', 100, 'S+10'),
  new Item(17, 'cursed axe', 'weapon', 100, 'S-10'),
  new Item(18, 'great axe', 'weapon', 200, 'S+20'),
  new Item(19, 'cursed great axe', 'weapon', 200, 'S-20'),
  new Item(20, 'torch', 'lighter', 2, ''),
  new Item(21, 'oil lamp', 'lighter', 10, ''),
  new Item(22, 'leather purse', 'purse', 10, ''),
  new Item(23, 'protection potion', 'potion', 100, 'a+10'),
  new Item(24, 'health potion', 'potion', 100, 'l+10'),
  new Item(25, 'strength potion', 'potion', 100, 's+10'),
  new Item(26, 'fireball', 'spell', 1000, ''),
  new Item(27, 'ice cone', 'spell', 1000, ''),
  new Item(28, 'total healing', 'spell', 1000, ''),
  new Item(29, 'invisibility', 'spell', 1000, ''),
  new Item(30, 'levitation', 'spell', 1000, ''),
  new Item(31, 'apple', 'food', 1, 'l+1'),
  new Item(32, 'chicken', 'food', 10, 'l+5'),
  new Item(33, 'beef', 'food', 15, 'l+10'),
  new Item(34, 'wine', 'food', 2, 'l+2')
];

class Perso {

  constructor(name, level) {
    this.name = name;
    this.level = level;
    this.slots = [
      {name:'head', id:1, items:[]},
      {name:'body', id:2, items:[]},
      {name:'hands', id:3, items:[]},
      {name:'belt', id:4, items:[]},
      {name:'bag', id:5, items:[]}
    ];
    this.boughtItems = [];
    this.life = 50*this.level;
    this.gold=500;
    this.updateCaracs();
  }

  updateCaracs() {
    this.vitality = this.level*50;
    this.armor = 0;
    this.strength = this.level*20;
    for(let i=0;i<this.slots.length;i++) {
      let slot = this.slots[i];
      for(let j=0;j<slot.items.length;j++) {
        let item = slot.items[j];
        // search for armor effects
        if (item.effect[0] == 'A') {
          let val = item.effect.substring(2,item.effect.length);
          if (item.effect[1] == '+') this.armor += eval(val);
          else if (item.effect[1] == '-') this.armor -= eval(val);
        }
        // search for vitality effects
        if (item.effect[0] == 'L') {
          let val = item.effect.substring(2,item.effect.length);
          if (item.effect[1] == '+') this.vitality += eval(val);
          else if (item.effect[1] == '-') this.vitality -= eval(val);
        }
        // search for strength effects
        if (item.effect[0] == 'S') {
          let val = item.effect.substring(2,item.effect.length);
          if (item.effect[1] == '+') this.strength += eval(val);
          else if (item.effect[1] == '-') this.strength -= eval(val);
        }
      }
    }
    if (this.life > this.vitality) this.life = this.vitality;
  }

  buy(item) {
    this.boughtItems.push(item);
    this.gold -= item.price;
  }

  assign(itemId, to) {
    let item = this.boughtItems[itemId];
    if (item == undefined) return false;
    let slot = this.slots.find(e => e.name == to);
    let slotLim = itemLimits.find(e => e.slot == to);
    // if to exists in player's slots and itemLimits
    if ((slot != undefined) && (slotLim != undefined)) {
      // check if limits/type is ok or not
      if (slot.items.length == slotLim.limit) {
        alert('limit for '+to+' alreay reached');
        return false;
      }
      let t = slotLim.types.find(e => e == item.type);
      if (t == undefined) {
        alert(to+' cannot be assigned with '+item.type);
        return false;
      }
      console.log("assign "+item.name+" to "+slot.name);
      slot.items.push(item);
      this.boughtItems.splice(itemId,1);
      this.updateCaracs();
      return true;
    }
    return false;
  }
}

var players = [
  new Perso("toto",1), new Perso("tutu",2)
];

var nbItemInShop = 8;

var shop = [];
shop = fillShop();

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function fillShop() {
  shop = [];
  for(let i=0;i<nbItemInShop;i++) {
    let idx = getRandomInt(items.length);
    shop.push(items[idx]);
  }
  return shop
}