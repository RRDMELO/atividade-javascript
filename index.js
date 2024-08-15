//criação das classes
class Funcionario {
	constructor(nome, idade, cargo) {
		this.nome = nome;
		this.idade = idade;
		this.cargo = cargo;
	}
	seApresentar() {
		alert(
			`Olá meu nome é ${this.nome}, tenho ${this.idade} e atualmente trabalho como ${this.cargo}.`
		);
	}

	trabalhar() {
		alert(`O funcionário ${this.nome} está trabalhando.`);
	}
}

class Gerente extends Funcionario {
	constructor(nome, idade, cargo, departamento) {
		super(nome, idade, cargo);
		this.departamento = departamento;
	}
	gerenciar() {
		alert(
			`O gerente ${this.nome} está gerencianto o departamento de ${this.departamento}.`
		);
	}
	static criarGerente(nome, idade, cargo, departamento) {
		const novoGerente = new Gerente(nome, idade, cargo, departamento);
		const index = gerentes.findIndex((gerente) => {
			return JSON.stringify(novoGerente) === JSON.stringify(gerente);
		});
		if (index === -1) {
			gerentes.push(novoGerente);
		} else {
			alert("Esse gerente ja foi cadastrado");
		}
	}
}
class Desenvolvedor extends Funcionario {
	constructor(nome, idade, cargo, linguagem) {
		super(nome, idade, cargo);
		this.linguagem = linguagem;
	}
	programar() {
		alert(
			`O desenvolvedor ${this.nome} está desenvolvendo em ${this.linguagem}.`
		);
	}

	static criarDesenvolvedor(nome, idade, cargo, linguagem) {
		const novoDev = new Desenvolvedor(nome, idade, cargo, linguagem);
		const index = desenvolvedores.findIndex((dev) => {
			return JSON.stringify(novoDev) === JSON.stringify(dev);
		});
		if (index === -1) {
			desenvolvedores.push(novoDev);
		} else {
			alert("Esse dev ja foi cadastrado");
		}
	}
}
//inicializando lista de funcionários
const gerentes = [
	new Gerente("João", 27, "Gerente Geral", "RH"),
	new Gerente("Marcia", 50, "Gerente de TI", "TI"),
	new Gerente("Alex", 42, "Gerente Adminsitrativo", "Aministrativo"),
];
const desenvolvedores = [
	new Desenvolvedor("Diego", 24, "Desenvolvedor Junior", "Java"),
	new Desenvolvedor("Anna", 34, "Desenvolvedor Senior", "JavaScript"),
	new Desenvolvedor("Beatriz", 38, "Desenvolvedor Pleno", "c++"),
];

//card
function cardGerente(gerente) {
	return `
            <div class="col-12 col-lg-6 mb-3 gerent-card">
                <div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${gerente.nome}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${gerente.cargo}</h6>
                    <p class="card-text">Gerente ${gerente.nome}, ${gerente.idade} anos.
                    <br>  ${gerente.cargo}, no departamento de ${gerente.departamento}</p>
                    <button class="card-link" id="apresentar" >Apresentar</button>
                    <button class="card-link" id="trabalhar">Trabalhar</button>
                    <button class="card-link" id="gerenciar">Gerenciar</button>
                    </div>
                </div>
            </div>`;
}

function cardDesenvolvedor(dev) {
	return `
    <div class="col-12 col-lg-6 mb-3 desenvolvedor-card" >
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${dev.nome}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${dev.cargo}</h6>
      <p class="card-text">Desenvolvedor ${dev.nome}, ${dev.idade} anos.
      <br>  ${dev.cargo}, linguagem ${dev.linguagem}</p>
      <button class="card-link" id="apresentar" >Apresentar</button>
      <button class="card-link" id="trabalhar">Trabalhar</button>
      <button  class="card-link" id="programar">Programar</button>
    </div>
  </div>
      </div>`;
}

// criação de fuções para manipular o DOM

// campo para listar funcionários
const funcionariosCadastrados = document.getElementById(
	"funcionarios-cadastrados"
);

let gerentesCard = (gerentes) =>
	gerentes.map((gerente, i) => cardGerente(gerente)).join("");

let desenvolvedorCard = (desenvolvedores) =>
	desenvolvedores.map((e) => cardDesenvolvedor(e)).join("");

funcionariosCadastrados.innerHTML =
	gerentesCard(gerentes) + desenvolvedorCard(desenvolvedores);

//campo adicional no formulario
const campoAdicional = document.getElementById("campo-adicional");

//radio button
const btnDesenvolvedor = document.getElementById("desenvolvedor");
const btnGerente = document.getElementById("gerente");

btnDesenvolvedor.addEventListener("change", () => {
	campoAdicional.innerHTML = `
        <div class="my-3">
            <label for="linguagem" class="form-label">Linguagem</label>
            <input type="text" class="form-control" id="linguagem" name="linguagem" required>
        </div>
    `;
});

btnGerente.addEventListener("change", () => {
	campoAdicional.innerHTML = `
	<div class="mb-3">
                <label for="departamento" class="form-label">Departamento</label>
                <input type="text" class="form-control" id="departamento" name="departamento" required>
            </div>
	`;
});

const formulario = document.forms[0];

formulario.addEventListener("submit", (event) => {
	event.preventDefault();
	const isValid = (value) =>
		value !== null && value !== undefined && value !== "";

	const formName = formulario.elements.nome.value.trim();
	const formIdade = Number(formulario.elements.idade.value.trim());
	const formCargo = formulario.elements.cargo.value.trim();

	if (isValid(formName) && isValid(formCargo) && isValid(formIdade)) {
		if (isNaN(formIdade)) {
			return alert("A idade deve ser um numero");
		}
		if (btnDesenvolvedor.checked) {
			const formLinguagem = formulario.elements.linguagem.value;
			if (isValid(formLinguagem)) {
				alert("Formulario enviado.");
				Desenvolvedor.criarDesenvolvedor(
					formName,
					formIdade,
					formCargo,
					formLinguagem
				);
				funcionariosCadastrados.innerHTML =
					gerentesCard(gerentes) + desenvolvedorCard(desenvolvedores);
				addClick();

				formulario.reset();
			} else {
				alert("é necessário preencher todos os campos");
			}
		} else if (btnGerente.checked) {
			const formDepartamento = formulario.elements.departamento.value;
			if (isValid(formDepartamento)) {
				alert("Formulario enviado.");
				Gerente.criarGerente(formName, formIdade, formCargo, formDepartamento);
				funcionariosCadastrados.innerHTML =
					gerentesCard(gerentes) + desenvolvedorCard(desenvolvedores);
				addClick();
				formulario.reset();
			} else {
				alert("é necessário preencher o Departamento");
			}
		} else {
			alert("é necessário preencher todos os campos");
		}
	} else {
		alert("Preencha os formularios corretamente");
	}
});

function addClick() {
	const cardListGerente = document.querySelectorAll(".gerent-card");
	const cardListDesenvolvedor = document.querySelectorAll(
		".desenvolvedor-card"
	);

	cardListGerente.forEach((card, i) => {
		card
			.querySelector("#apresentar")
			.addEventListener("click", () => gerentes[i].seApresentar());
		card
			.querySelector("#trabalhar")
			.addEventListener("click", () => gerentes[i].trabalhar());
		card
			.querySelector("#gerenciar")
			.addEventListener("click", () => gerentes[i].gerenciar());
	});

	cardListDesenvolvedor.forEach((card, i) => {
		card
			.querySelector("#apresentar")
			.addEventListener("click", () => desenvolvedores[i].seApresentar());
		card
			.querySelector("#trabalhar")
			.addEventListener("click", () => desenvolvedores[i].trabalhar());
		card
			.querySelector("#programar")
			.addEventListener("click", () => desenvolvedores[i].programar());
	});
}
addClick();
