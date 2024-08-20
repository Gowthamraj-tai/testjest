import React, { useState } from 'react';
import './Table.css';

const Table = () => {
  const [studentData, setStudentData] = useState([
    {
      name: "gowtham",
      age: 20,
      job: "student",
      score: 90
    },
    {
      name: "John",
      age: 22,
      job: "developer",
      score: 88
    }
  ]);
  const fields=["name", "age", "job", "score" ]

  const [isAdding, setIsAdding] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', job: '', score: '' });
  const [filter, setFilter] = useState({ name: '', age: '', job: '', score: '' });
 
  const handleDelete = (index) => {
    setStudentData(studentData.filter((_others, i) => 
        i !== index)
);
  };

  const handleEditButton = (index) => {
    const updatedStudents = studentData.map((student, i) =>
      i === index ? { ...student, isEditing: true } : student
    );

    setStudentData(updatedStudents);
  };

  const handleSave = (index) => {
    const updatedStudents = studentData.map((student, i) =>
      i === index ? { ...student, isEditing: false } : student
    );
    setStudentData(updatedStudents);
  };

  const handleEdit = (index, field, value) => {
    const updatedStudents = studentData.map((student, i) =>
      i === index ? { ...student, [field]: field === 'age' || field === 'score' ? parseInt(value) : value } : student
    );
    setStudentData(updatedStudents);
  };

  const handleAddButton = () => {
    setIsAdding(true);
  };

  const handleInputChange = (e) => {
    setNewStudent({
      ...newStudent,
      [e.target.name]: e.target.value
    });
  };

  const handleAddNewStudent = (e) => {
    e.preventDefault();
    if (newStudent.name !== '' || newStudent.age !== '' || newStudent.job !== '' || newStudent.score !== '') {
      setStudentData([...studentData, { 
        name: newStudent.name, 
        age: newStudent.age, 
        job: newStudent.job, 
        score: newStudent.score, 
        isEditing: false 
      }]);
    }
    setNewStudent({ name: '', age: '', job: '', score: '' });
    setIsAdding(false);
  };
  

  const handleCancel = () => {
    setIsAdding(false); 
  };

  const handleFilterButton = () => {
    setIsFiltering(!isFiltering);
    setFilter({ name: '', age: '', job: '', score: '' });
  };
  
  const handleFilterChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  };

  const filteredData = studentData.filter(student => {
    const Name = filter.name === '' || student.name.toLowerCase().includes(filter.name.toLowerCase());
    const Job = filter.job === '' || student.job.toLowerCase().includes(filter.job.toLowerCase());
    const Age = filter.age === '' || student.age === parseInt(filter.age);
    const Score =filter.score === '' || student.score >= parseInt(filter.score);
    return Name && Age && Job && Score;
  });

  return (
    <div className='table-container'>
    <div className='options'>
        {!isAdding && !isFiltering &&(
            <>
      <button className="firstButton"onClick={handleAddButton} >
        Add Student
      </button>

      <button className="secondButton"onClick={handleFilterButton}>
        Show Filters
      </button>
      </>
        )
       }
      {isFiltering && (
        <div className='filterContainer'>
            {fields.map((current)=>(
                <input
                type="text"
                name={current}
                placeholder={`Filter by ${current}`}
                value={filter.current}
                onChange={handleFilterChange}
                />
            )
        )
     }
        
        <button type="button"   className="firstButton" onClick={handleFilterButton}>Cancel Filter </button>
        </div>
      )}

      {isAdding && (
        <form className='addForm' onSubmit={handleAddNewStudent}>


            {fields.map((current)=>(
                <input
                type="text"
                name={current}
                placeholder={current}
                value={filter.current}
                onChange={handleInputChange}
                />
            )
        )
     }
        

          <button  className="firstButton" type="submit">Add Student</button>
          <button  className="secondButton" onClick={handleCancel}>Cancel Add Student</button>
        </form>
      )}
</div>
      <table className='table' data-testid="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Job</th>
            <th>Score</th>
          
          </tr>
        </thead>
        <tbody>
          {filteredData.map((student, index) => (
            
            <tr key={index}>
                
            {/* {fields.map((current)=>(
               <td>
               {student.isEditing ? (
                 <input
                   type="text"
                   value={student.current}
                   onChange={(e) => handleEdit(index, `${current}`, e.target.value)}
                 />
               ) : (
                 student.current
               )}
             </td>
            )
        )
     } */}
        
              <td>
                {student.isEditing ? (
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleEdit(index, 'name', e.target.value)}
                  />
                ) : (
                  student.name
                )}
              </td>
              <td>
                {student.isEditing ? (
                  <input
                    type="number"
                    value={student.age}
                    onChange={(e) => handleEdit(index, 'age', e.target.value)}
                  />
                ) : (
                  student.age
                )}
              </td>
              <td>
                {student.isEditing ? (
                  <input
                    type="text"
                    value={student.job}
                    onChange={(e) => handleEdit(index, 'job', e.target.value)}
                  />
                ) : (
                  student.job
                )}
              </td>
              <td>
                {student.isEditing ? (
                  <input
                    type="number"
                    value={student.score}
                    onChange={(e) => handleEdit(index, 'score', e.target.value)}
                  />
                ) : (
                  student.score
                )}
              </td>
              <td>
                {student.isEditing ? (
                  <button className="firstButton" onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <button className="firstButton" onClick={() => handleEditButton(index)}>Edit</button>
                )}
                <button  className="secondButton" onClick={() => handleDelete(index)}>Delete</button>
                </td>
            </tr>
          ))}
          </tbody>
      </table>
    </div>
  );
};

export default Table;
