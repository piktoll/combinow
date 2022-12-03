class MathItem {
    constructor(name, repeated, exercise) {
        this.name = name;
        this.repeated = repeated;
        this.exercise = exercise;
    }
}

window.onload = function () {
    const app = {
        title: 'Combinow',
        desc: 'Smarter Combinatrics',
        year: 2022,
        publisher: 'Karhut Group',
        returnTitle: function () {
            return `${this.title} | ${this.desc}`;
        },
        fact: function (n) {
            for (let i = n - 1; i >= 1; i--) {
                n *= i;
            }
            return n;
        },
        permutation: function (repeat, n, k, k2) {
            const v = repeat
                ? (app.fact(n) / ((app.fact(k)) * (app.fact(k2))))
                : (app.fact(n));
            return v;
        },
        variation: function (repeat, n, k) {
            const v = repeat
                ? (Math.pow(n, k))
                : ((app.fact(n)) / (app.fact(n - k)));
            return v;
        },
        combination: function (repeat, n, k) {
            const v = repeat
                ? (app.fact(Number(n) + Number(k) - 1) / (app.fact(k) * app.fact(n - 1)))
                : (app.fact(n) / (app.fact(k) * app.fact(n - k)));
            return v;
        }
    };

    const appTitle = app.returnTitle();
    document.title = appTitle;

    const headerEl = document.getElementsByTagName("header")[0];
    headerEl.innerHTML = `<h1>${app.title}</h1><h3>${app.desc}</h3>`;

    const containerEl = document.getElementById("math-item-container");
    const footerEl = document.getElementsByTagName("footer")[0].getElementsByTagName("p")[0];
    footerEl.innerHTML = `${appTitle} CC-BY-SA&nbsp;3.0 ${app.year} ${app.publisher}.`;

    let mathFx = [
        app.permutation,
        app.permutation,
        app.variation,
        app.variation,
        app.combination,
        app.combination
    ];

    for (let i = 0; i < mathItems.length; i++) {
        const item = mathItems[i];

        let mathItemEl = document.createElement('div');
        mathItemEl.className = 'math-item';
        mathItemEl.innerHTML = `<h2>${item.name}</h2>
            <p class="math-item-exercise">${item.exercise}</p>
            <button class="primary-btn">Megoldás</button>
            <p class="math-item-solution"></p>`;
        mathItemEl.getElementsByClassName("primary-btn")[0].addEventListener("click",
            function () {
                let n = 0;
                let k = 0;
                let k2 = 0;

                if (mathItemEl.getElementsByClassName("total")[0])
                    n = mathItemEl.getElementsByClassName("total")[0].value;
                if (mathItemEl.getElementsByClassName("favorable")[0])
                    k = mathItemEl.getElementsByClassName("favorable")[0].value;
                if (mathItemEl.getElementsByClassName("favorable")[1])
                    k2 = mathItemEl.getElementsByClassName("favorable")[1].value;

                const solution = mathFx[i](item.repeated, n, k, k2);

                mathItemEl.getElementsByClassName("math-item-solution")[0].innerHTML = (solution && solution != Infinity && solution > 0)
                    ? (`Válasz: ${solution}`)
                    : (``);
            })
        containerEl.append(mathItemEl);
    }
}

const mathItems = [
    new MathItem('Ismétlés nélküli permutáció', false, 'Kiválasztottunk <input type="number" class="total number"> különböző fagylaltgombócot. Ezeket szeretnénk sorba rendezni a tölcsérben. Mennyi a lehetséges sorrendek száma?'),
    new MathItem('Ismétléses permutáció', true, 'Kiválasztottunk <input type="number" class="total number"> gombóc fagylaltot. Ezeket szeretnénk sorba rendezni a tölcsérben, de vannak közöttük azonosak. Közülük <input type="number" class="favorable number"> pisztácia, <input type="number" class="favorable number"> csokoládé. Mennyi a lehetséges sorrendek száma?'),
    new MathItem('Ismétlés nélküli variáció', false, '<input type="number" class="total number"> különböző fagylaltgombócból <input type="number" class="favorable number"> darabot választunk ki. Ezt követően még sorba is rendezzük őket a fagylaltos tölcsérünkben. Mennyi a lehetséges variációk száma?'),
    new MathItem('Ismétléses variáció', true, '<input type="number" class="total number"> fagylaltgombócból <input type="number" class="favorable number"> darabot választunk ki. Ezt követően még sorba is rendezzük őket a fagylaltos tölcsérünkben. Mennyi a lehetséges variációk száma?'),
    new MathItem('Ismétlés nélküli kombináció', false, '<input type="number" class="total number"> különböző fagylaltgombócból <input type="number" class="favorable number"> darabot választunk ki a fagylaltos kelyhünkbe. Mennyi a lehetséges kiválasztások száma?'),
    new MathItem('Ismétléses kombináció', true, '<input type="number" class="total number"> fagylaltgombócból <input type="number" class="favorable number"> darabot választunk ki a fagylaltos kelyhünkbe. Mennyi a lehetséges kiválasztások száma?')
];