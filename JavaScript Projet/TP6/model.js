function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
  {slot:'head', limit:1, types: [ 'helmet' , 'crown' ]},
  {slot:'body', limit:1, types: [ 'armor', 'clothes' ]},
  {slot:'hands', limit:2, types: [ 'weapon', 'lighter']},
  {slot:'belt', limit:3, types: [ 'weapon', 'purse']},
  {slot:'bag', limit:10, types: [ 'helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse' ]}
];

class Item {
  constructor(_id, name, type, price, effect) {
    this._id = _id;
    this.name = name;
    let idx = itemCats.findIndex(e => e == type);
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

  static fromObject(obj) {
    let it = new Item(obj._id, obj.name, obj.type,obj.price, obj.effect);
    return it;
  }
}

class Slot {
  constructor(_id, name) {
    this._id = _id;
    this.name = name;
    this.items = [];
  }

  static fromObject(obj) {
    let sl = new Slot(obj._id, obj.name);
    obj.items.forEach(item => { sl.items.push(Item.fromObject(item)); });
    return sl;
  }
}

class Perso {

  constructor(_id, name, level) {
    this._id = _id;
    this.name = name;
    this.level = level;
    this.slots= [];
    this.slots.push(new Slot(0,"head"));
    this.slots.push(new Slot(1,"body"));
    this.slots.push(new Slot(2,"hands"));
    this.slots.push(new Slot(3,"belt"));
    this.slots.push(new Slot(4,"bag"));
    this.boughtItems = [];
    this.life = 50*this.level;
    this.gold=500*this.level;
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

  static fromObject(obj) {
    let p = new Perso(obj._id, obj.name, obj.level);
    p.gold = obj.gold;
    p.life = obj.life;
    p.vitality = obj.vitality;
    p.strength = obj.strength;
    p.armor = obj.armor;
    p.slots.splice(0,p.slots.length);
    obj.slots.forEach(slot => { p.slots.push(Slot.fromObject(slot)); });
    return p;
  }
}

class Shop {
  constructor(_id, name, type) {
    this._id = _id;
    this.name = name;
    this.type = type;
    this.items = [];
  }

  static fromObject(obj) {
    let sh = new Shop(obj._id, obj.name, obj.type);
    obj.items.forEach(item => { sh.items.push(Item.fromObject(item)); });
    return sh;
  }
}

class Street {
  constructor(_id, name) {
    this._id = _id;
    this.name = name;
    this.shops = [];
  }
  static fromObject(obj) {
    let st = new Street(obj._id, obj.name);
    obj.shops.forEach(shop => { st.shops.push(Shop.fromObject(shop)); });
    return st;
  }
}

var items = [];
var persos = [];
var streets = [];