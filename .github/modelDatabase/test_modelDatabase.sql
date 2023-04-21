-- CRIAR TODAS AS TABELAS DO BANCO DE DADOS
CREATE TABLE departamento (
	dp_id SERIAL PRIMARY KEY,
	dp_name VARCHAR(30),
	dp_email VARCHAR(100),
	dp_password VARCHAR(300)
);

CREATE TABLE curso (
	cur_id SERIAL PRIMARY KEY,
	cur_name VARCHAR(100),
	dp_id INTEGER,
	FOREIGN KEY (dp_id) REFERENCES departamento(dp_id)
);

CREATE TABLE professor(
	prof_id SERIAL PRIMARY KEY,
	prof_name VARCHAR(30),
	prof_phone INTEGER,
	prof_email VARCHAR(100),
	prof_password VARCHAR(300),
	prof_status BOOLEAN,
	dp_id INTEGER,
	FOREIGN KEY (dp_id) REFERENCES departamento(dp_id)
);

CREATE TABLE aluno(
	alu_id SERIAL PRIMARY KEY,
	alu_name VARCHAR (30),
	alu_matricula INTEGER,
	alu_curso VARCHAR(100),
	alu_status BOOLEAN,
	alu_periodo INTEGER,
	alu_name_mae VARCHAR(100),
	alu_name_pai VARCHAR (100),
	alu_phone INTEGER,
	alu_email VARCHAR(100),
	alu_password VARCHAR(300),
	cur_id INTEGER,
	FOREIGN KEY (cur_id) REFERENCES curso (cur_id)
);

CREATE TABLE endereco(
	end_id SERIAL PRIMARY KEY,
	end_rua VARCHAR(100),
	end_city VARCHAR(100),
	end_bairro VARCHAR(100),
	end_number INTEGER,
	end_complemento TEXT,
	alu_id INTEGER,
	FOREIGN KEY (alu_id) REFERENCES aluno (alu_id)
);

CREATE TABLE materia(
	mat_id SERIAL PRIMARY KEY,
	mat_name VARCHAR(100),
	mat_turno VARCHAR(10),
	mat_professor VARCHAR(30),
	mat_quantidade_aluno INTEGER,
	mat_obrigatoriedade BOOLEAN,
	mat_descricao TEXT,
	mat_av1 NUMERIC(10,2),
	mat_av2 NUMERIC(10,2),
	mat_av3 NUMERIC(10,2),
	mat_nota_final NUMERIC(10,2),
	mat_hora_inicial TIME,
	mat_hora_final TIME,
	dp_id INTEGER,
	FOREIGN KEY (dp_id) REFERENCES departamento(dp_id)
);

CREATE TABLE materia_materia(
	idPre_requisito INTEGER,
	mat_id INTEGER,
	FOREIGN KEY (mat_id) REFERENCES materia(mat_id)
);

CREATE TABLE professor_materia(
	mat_id INTEGER,
	FOREIGN KEY (mat_id) REFERENCES materia(mat_id),
	prof_id INTEGER,
	FOREIGN KEY (prof_id) REFERENCES professor(prof_id)
);

CREATE TABLE aluno_materia(
	frequencia INTEGER,
	alu_id INTEGER,
	FOREIGN KEY (alu_id) REFERENCES aluno (alu_id),
	mat_id INTEGER,
	FOREIGN KEY (mat_id) REFERENCES materia(mat_id)
);

CREATE TABLE curso_materia(
	mat_id INTEGER,
	FOREIGN KEY (mat_id) REFERENCES materia(mat_id),
	cur_id INTEGER,
	FOREIGN KEY (cur_id) REFERENCES curso (cur_id)
);



-- CRIAR DADOS PARA TODAS AS TABELAS
INSERT INTO departamento (dp_name, dp_email, dp_password) 
VALUES ('departamento','matematica@universidade.com','senha123');

INSERT INTO curso (cur_name, dp_id) 
VALUES ('Matemática', 1), ('Física', 1), ('Química', 1), ('Biologia', 1), ('História', 1);

INSERT INTO professor (prof_name, prof_phone, prof_email, prof_password, prof_status, dp_id) 
VALUES ('João Silva', 999999999, 'joao.silva@universidade.com', 'senha123', true, 1), 
('Maria Santos', 888888888, 'maria.santos@universidade.com', 'senha123', true, 1), 
('José Oliveira', 777777777, 'jose.oliveira@universidade.com', 'senha123', true,1),
('Ana Souza', 666666666, 'ana.souza@universidade.com', 'senha123', true, 1),
('Pedro Costa', 555555555, 'pedro.costa@universidade.com', 'senha123', true,1);

INSERT INTO aluno (alu_name, alu_matricula, alu_curso, alu_status, alu_periodo, alu_name_mae, alu_name_pai, alu_phone, alu_email, alu_password, cur_id)
VALUES ('Lucas Silva Santos', 11111111, 'Matemática', true, 1,'Maria Silva Santos','João Silva Santos' ,999999999,'lucas.silva.santos@universidade.com','senha123' ,1),
('Julia Oliveira Souza' ,22222222 ,'Física' ,true ,1 ,'Marta Oliveira Souza' ,'José Oliveira Souza' ,888888888 ,'julia.oliveira.souza@universidade.com' ,'senha123' ,2),
('Gabriel Costa Lima' ,33333333 ,'Química' ,true ,1 ,'Ana Costa Lima' ,'Pedro Costa Lima' ,777777777 ,'gabriel.costa.lima@universidade.com' ,'senha123' ,3), 
('Fernanda Rocha Almeida' ,44444444 ,'Biologia' ,true ,1 ,'Carla Rocha Almeida' ,'Roberto Rocha Almeida' ,666666666 ,'fernanda.rocha.almeida@universidade.com' ,'senha123' ,4),
('Rafaela Dias Barbosa' ,55555555 ,'História' ,true ,1 ,'Sonia Dias Barbosa' ,'Paulo Dias Barbosa' ,555555555 ,'rafaela.dias.barbosa@universidade.com' ,'senha123' ,5);

INSERT INTO endereco (end_rua, end_city, end_bairro, end_number, end_complemento, alu_id)
VALUES ('Rua das Flores', 'São Paulo', 'Jardim das Rosas', 123, 'Apto 101', 1), 
('Avenida Paulista', 'São Paulo', 'Bela Vista', 456, 'Apto 202', 2), 
('Rua Augusta', 'São Paulo', 'Consolação', 789, 'Apto 303', 3), 
('Alameda Santos', 'São Paulo', 'Jardim Paulista', 321, 'Apto 404', 4), 
('Rua Oscar Freire', 'São Paulo', 'Jardins', 654, 'Apto 505', 5);
    
INSERT INTO curso (cur_name, dp_id) 
VALUES ('Matemática', 1), ('Física', 1), ('Química', 1), ('Biologia', 1), ('História', 1);
  
INSERT INTO materia (mat_name, mat_turno, mat_professor, mat_quantidade_aluno, mat_obrigatoriedade, mat_descricao,mat_av1,mat_av2,mat_av3,mat_nota_final,mat_hora_inicial,mat_hora_final,dp_id)
VALUES ('Cálculo I', 'Manhã', 'João Silva', 30, true, 'Introdução ao cálculo diferencial e integral',10,5.5,1,16.5/2,'08:00:00','10:00:00', 1),
('Física I', 'Tarde', 'Maria Santos', 30, true, 'Introdução à mecânica clássica',10,5.5,1,16.5/2,'13:00:00','15:00:00', 1), 
('Química Geral', 'Noite', 'José Oliveira', 30, true, 'Introdução à química geral e inorgânica',4.9,9,1,14.9/2,'19:00:00','21:00:00' ,1),
('Biologia Celular', 'Manhã', 'Ana Souza', 30, true, 'Introdução à biologia celular e molecular',9,9,1,19/2,'08:00:00','10:00:00' ,1),
('História Antiga', 'Tarde', 'Pedro Costa', 30, true, 'Introdução à história antiga e medieval',10,9,1,20/2,'13:00:00','15:00:00' ,1);
	
INSERT INTO professor_materia (prof_id, mat_id) 
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5);
  
INSERT INTO aluno_materia (alu_id, mat_id)
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5); 
  
INSERT INTO materia_materia (idPre_requisito, mat_id)
VALUES (1, 2), (2, 3), (3, 4), (4, 5), (5, 1);
 
INSERT INTO curso_materia (mat_id, cur_id)
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5);




--CONSULTAS NO BANCO DE DADOS:
	-- consultas simples:
		-- consultar todos os dados de uma tabela
		SELECT * FROM professor;
		SELECT * FROM materia;
		SELECT * FROM aluno;
		SELECT * FROM endereco;
		SELECT * FROM curso;
		SELECT * FROM departamento;
		SELECT * FROM professor_materia;
		SELECT * FROM aluno_materia;
		SELECT * FROM materia_materia;
		-- retornar duas tabelas juntas (identificando as duas tabelas pelo id de cada uma).(nao importa se as tabelas tem alguma relação)
		SELECT *
		FROM aluno
		JOIN endereco
		ON aluno.alu_id = endereco.end_id;







	-- consultas mais complexas: 
		--retornar todos os alunos que mora em um determinado rua	
		SELECT aluno.*
		FROM aluno
		WHERE alu_id IN (
  		 	SELECT end_id
    		FROM endereco
   			WHERE end_rua = 'Rua das Flores'	
		);
			--retornar todos os alunos que estão matriculado em um curso
			SELECT *
			FROM aluno		
			WHERE alu_curso = 'Matemática';
			
			
					

-- CRUD
	--Atualizar um dado da Tabela (atualizar o nome do aluno)
	UPDATE aluno
	SET alu_name ='Francisco josé da silva'
	WHERE alu_id = 1; -- A Cláusula sera que: Para ter essa atualização o id do aluno deve ter o valor 1

	-- Criar um novo aluno na tabela aluno
	INSERT INTO aluno (alu_name, alu_matricula, alu_curso, alu_status, alu_periodo, alu_name_mae, alu_name_pai, alu_phone, alu_email, alu_password, cur_id)
	VALUES ('Lucas Silva Santos', 8781133, 'Matemática', true, 2,'Sandra Silva Lima','Lucas Silva Lima' ,983549944,'silva.lima@universidade.com','123senha' ,1)
		INSERT INTO aluno_materia (alu_id, mat_id)
		VALUES (6, 1); 
			INSERT INTO endereco (end_rua, end_city, end_bairro, end_number, end_complemento, alu_id)
			VALUES ('Rua das Flores', 'São Paulo', 'Jardim das Rosas', 123, 'Apto 101', 6);
		
			--Criar um novo professor,materia dada e curso relacionado
			INSERT INTO professor (prof_name, prof_phone, prof_email, prof_password, prof_status, dp_id) 
			VALUES ('Lucas santos', 935432223, 'lucas.santos@universidade.com', 's23', true, 1);
				INSERT INTO materia (mat_name, mat_turno, mat_professor, mat_quantidade_aluno, mat_obrigatoriedade, mat_descricao,mat_av1,mat_av2,mat_av3,mat_nota_final,mat_hora_inicial,mat_hora_final,dp_id)
				VALUES ('Cálculo II', 'Manhã', 'Lucas santos', 3, true, 'cálculo integral',10,5.5,1,16.5/2,'01:00:00','03:00:00', 1);
					INSERT INTO professor_materia (prof_id, mat_id) 
					VALUES (6,6);
						INSERT INTO curso_materia (mat_id, cur_id)
						VALUES (6, 1);
	
	
	






--VERIFICAÇÕES E ALTERAÇÕES DOS ATRIBUTOS E TABELAS
	--verificar qual nome de uma tabela apenas sabendo um dos atributos
		SELECT table_name
		FROM information_schema.columns
		WHERE column_name = 'al_mat';
	-- atualizar o nome de um atributo de uma tabela
		ALTER TABLE aluno_materia
		RENAME COLUMN alu_mat TO frequencia;
		
		
