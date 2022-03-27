var matrix = document.getElementById("matrix");

var setup = {
  col: 40,
  row: 21,
}

function randomInt(a, b){
  return (Math.random() * (b - a + 1) + a) | 0;
}
function mapLine(x, x1, x2, y1, y2){
  let m = (y2 - y1) / (x2 - x1);
  let y0 = y1 - m * x1;
  return m * x + y0;
}


class Char{
  constructor(columnElement){
    this.element = document.createElement("div");
    this.element.classList.add("char");
    this.change();
    this.reset();
    columnElement.appendChild(this.element);
    this.run();
  }
  change(){
    this.element.innerHTML = String.fromCharCode(randomInt(0x30A0, 0x30FF));
  }
  run(){
    this.change();
    setTimeout(() => this.run(), this.frequency);
  }
  reset(){
    this.runOn = Math.random()>0.5;
    this.frequency = randomInt(80, 2000);
  }
  light(){
    this.element.classList.add("charLight");
  }
  fade(location, position, size){
    this.element.classList.remove("charLight");
    this.element.style.opacity = mapLine(location, position, position - size, 1, 0);
  }
}
class Column{
  constructor(matrixElement){
    this.element = document.createElement("div");
    this.element.classList.add("column");
    this.chars = [];
    for(let i = 0 ; i < setup.row ; i++){
      this.chars[i] = new Char(this.element);
    }
    this.reset();
    matrixElement.appendChild(this.element);
  }
  reset(){
    this.position = 0;
    this.size = randomInt(8,setup.row);
    this.speed = randomInt(70,130);
    this.chars.forEach(char => char.reset());
  }
  run(){
    if(this.position < setup.row){
      this.chars[this.position].light();
      this.chars[this.position].change();
    }
    for(let i = this.position - 1 ; i >= 0 ; i--){
      if(i>=0 && i<setup.row){
        this.chars[i].fade(i, this.position, this.size);
      }
    }
    if(this.position == setup.row + this.size + 1){
      this.reset();
    }else{
      this.position++;
    }
    setTimeout(() => this.run(), this.speed);
  }
}
class Grid{
  constructor(matrixElement){
    this.element = matrixElement;
    this.element.classList.add("matrix");
    this.columns = [];
    for(let i = 0 ; i < setup.col ; i++){
      this.columns[i] = new Column(this.element);
    }
  }
  run(){
    this.columns.forEach(column => column.run());
  }
}

var grid = new Grid(matrix);

grid.run();
