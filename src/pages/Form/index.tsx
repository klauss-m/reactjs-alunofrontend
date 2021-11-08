import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form, FormCheck } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { DateTime } from 'luxon';
import api from '../../services/api';
import './index.css';

interface PropsStudent {
  id: string;
  name: string;
  ra: string;
  dateOfBirth: string;
  address: string;
  enrolled: boolean;
  age: number;
}

export function StudentForm() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<PropsStudent>({
    id: '',
    name: '',
    ra: '',
    dateOfBirth: '',
    address: '',
    enrolled: false,
    age: 0,
  });

  async function findStudent(id: string) {
    const response = await api.get<PropsStudent>(`/students/${id}`);
    setStudent({
      id: response.data.id,
      name: response.data.name,
      ra: response.data.ra,
      dateOfBirth: response.data.dateOfBirth,
      address: response.data.address,
      enrolled: response.data.enrolled,
      age: response.data.age,
    });
  }

  useEffect(() => {
    console.log(id);
    if (id !== undefined) {
      findStudent(id);
    }
  }, [id]);

  function updateStudent(e: ChangeEvent<HTMLInputElement>) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function pageBack() {
    history.goBack();
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id !== undefined) {
      await api.put(`/students/${id}`, student);
    } else {
      await api.post('/students/', student);
    }
    pageBack();
  }

  async function deleteStudent(id: string) {
    await api.delete(`/students/${id}`);
    pageBack();
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Aluno</h1>
        <Button variant="dark" size="sm" onClick={pageBack}>
          Voltar
        </Button>
        <Button variant="danger" size="sm" onClick={() => deleteStudent(id)}>
          Excluir
        </Button>
      </div>
      <br />
      <div className="container">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={student.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateStudent(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>RA</Form.Label>
            <Form.Control
              as="textarea"
              name="ra"
              value={student.ra}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateStudent(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Data de Nascimento</Form.Label>
            <Form.Control
              as="textarea"
              name="dateOfBirth"
              value={DateTime.fromISO(student.dateOfBirth).toLocaleString(
                DateTime.DATE_SHORT
              )}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateStudent(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              value={student.address}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateStudent(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <FormCheck
                type="checkbox"
                label="Matriculado"
                name="enrolled"
                checked={student.enrolled}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  updateStudent(e)
                }
              />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Label>Idade</Form.Label>
            <Form.Control
              as="textarea"
              name="age"
              value={student.age}
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateStudent(e)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Salvar
          </Button>
        </Form>
      </div>
    </div>
  );
}
