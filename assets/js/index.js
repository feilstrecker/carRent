const category = document.querySelector('.category-form');
const door = document.querySelector('.door-form');
const seat = document.querySelector('.seat-form');
const brand = document.querySelector('.brand-form');
const searchButton = document.querySelector('.search-button');
const carGrid = document.querySelector('.car-grid');

function MyCheckBox() {
    
    this.getData = (async function() {
        const response = await fetch("assets/data.json");
        return await response.json().then(dados => {
            return dados;
        });
        
    }())

    this.getCategory = function(){
        if (category[0].checked) return 'Economy';
        if (category[1].checked) return 'SUV';
        if (category[2].checked) return 'Minivan';
        if (category[3].checked) return 'Esportivo';
    }

    this.getDoor = function(){
        if (door[0].checked)  return '2 portas';
        if (door[1].checked)  return '4 portas';
    }

    this.getSeat = function(){
        if (seat[0].checked) return '2 assentos';
        if (seat[1].checked) return '5 assentos';
        if (seat[2].checked) return '7 assentos';
    }

    this.getBrand = function(){
        if (brand[0].checked) return 'Nissan';
        if (brand[1].checked) return 'Fiat';
        if (brand[2].checked) return 'Mazda';
    }

    this.cleanCarGrid = function(){
        carGrid.innerHTML = '';
    }

    this.searchCar = function(){

        this.getData.then(dados => {
            this.data = dados;
            this.cars = [];
            for(car of this.data) {      
                n = 0;          
                if(this.getCategory() === car.category || this.getCategory() === undefined) {
                    n += 1;
                }
                if(this.getDoor() === car.door || this.getDoor() === undefined) {
                    n += 1;
                }
                if(this.getSeat() === car.seat || this.getSeat() === undefined) {
                    n += 1;
                }
                if(this.getBrand() === car.brand || this.getBrand() === undefined) {
                    n += 1;
                }
    
                if (n == 4) {
                    this.cars.push(car);
                }
                
            }
            for (car of this.cars) {
                let article = document.createElement('article');
                let infoContainer = document.createElement('div');
                let img = document.createElement('img');
                let name = document.createElement('h4');
                let info1 = document.createElement('p');
                let info2 = document.createElement('p');
                let info3 = document.createElement('p');
                let info4 = document.createElement('p');
                let reservButton = document.createElement('button');
                
                info1.innerHTML = `<b>R$${car['daily']},00</b> diária`
                info2.innerHTML = `Categoria: ${car['category']}`;
                info3.innerHTML = car['door'];
                info4.innerHTML = car['year'];
                reservButton.innerHTML = 'Reservar';

                name.innerHTML = car['name'];
                name.className = 'h4-car-grid';
                info1.className = 'daily-price';
                reservButton.className = 'reservButton';

                infoContainer.className = 'car-info-container';

                img.src = car['image'];
                img.className = 'car-img';

                article.className = 'car-item';

                infoContainer.appendChild(img);
                infoContainer.appendChild(name);
                infoContainer.appendChild(info1);
                infoContainer.appendChild(info2);
                infoContainer.appendChild(info3);
                infoContainer.appendChild(info4);

                article.appendChild(infoContainer);
                article.appendChild(reservButton);

                carGrid.appendChild(article);
            }
        });
    }
}

p1 = new MyCheckBox();
p1.searchCar()

searchButton.addEventListener('click', (e)=> {
    p1.cleanCarGrid()
    p1.getBrand(brand)
    p1.getCategory(category)
    p1.getDoor(door)
    p1.getSeat(seat)
    p1.searchCar()
})