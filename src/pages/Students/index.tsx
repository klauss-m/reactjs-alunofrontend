import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import api from '../../services/api';
import { DateTime } from 'luxon';

interface PropsStudent {
  id: string;
  name: string;
  ra: string;
  dateOfBirth: string;
  address: string;
  enrolled: boolean;
  age: number;
  created_at: Date;
  updated_at: Date;
}

export function Students() {
  const [students, setStudents] = useState<PropsStudent[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    const response = await api.get('/students');
    console.log(response);
    setStudents(response.data);
  }

  function editStudent(id: string) {
    history.push(`/students/${id}`);
  }

  function newStudent() {
    history.push('/students_new/');
  }

  return (
    <div className="container">
      <br />
      <h1>Alunos</h1>
      <br />
      <Button variant="primary" onClick={newStudent}>
        Novo Aluno
      </Button>
      <br />
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>RA</th>
            <th>Data de Nascimento</th>
            <th>Idade</th>
            <th>Matricula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.ra}</td>
              <td>
                {DateTime.fromISO(student.dateOfBirth).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </td>
              <td>{student.age}</td>
              <td>{student.enrolled ? 'Matriculado' : 'Pendente'}</td>
              <td>
                {' '}
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => editStudent(student.id)}
                >
                  Editar
                </Button>{' '}
                <Button size="sm" variant="warning">
                  Visualizar
                </Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
