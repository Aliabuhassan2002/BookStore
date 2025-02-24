import axios from "axios";
import React, { useState, useEffect} from "react";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentBookId, setCurrentBookId] = useState(0);
  const [newBook, setNewBook] = useState({ title: "", author: "", desc: "", publication: "", genre: "",is_deleted:false });

useEffect(()=>{


  const handleDisplayBooks=async()=>{

    let response=await axios.get('http://localhost:3000')
    setBooks(response.data);

  }

  handleDisplayBooks();


},[])

  const handleAddBook = async() => {
    // setBooks([...books, newBook]);
await axios.post('http://localhost:3000/addBook',{newBook});
 setNewBook({ title: "", author: "", desc: "", publication: "", genre: "" });
    setShowModal(false);
    handleDisplayBooks();
  }

  const handleDeleteBook = async(id) => {
await axios.delete(`http://localhost:3000/deleteBook/${id}`)
  };

  const handleEditBook = (id,index) => {
      setCurrentBook({ ...books[index], index });
      setCurrentBookId(id);
      setEditModal(true);
      
    };
    
    const handleUpdateBook = () => {
      
      axios.post(`http://localhost:3000/updateBook/${currentBookId}`,currentBook);
      console.log(currentBook);

    
    setEditModal(false);
  };

  return (
    <div className="p-6">
      {/* Insert Book Button */}
      <button onClick={() => setShowModal(true)} className="mb-4 bg-blue-500 text-white p-2 rounded">Insert Book</button>

      {/* Books Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p className="text-sm">Author: {book.author}</p>
            <p className="text-sm">Genre: {book.genre}</p>
            <p className="text-sm">Publication: {book.publication}</p>
            <p className="text-xs text-gray-500">{book.desc}</p>
            <div className="flex justify-between mt-2">
              <button onClick={() => handleEditBook(book.id,index)} className="bg-yellow-500 text-white p-2 rounded">Update</button>
              <button onClick={() => handleDeleteBook(book.id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Insert Book Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Insert Book</h2>
            <input className="w-full p-2 border mb-2" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
            <input className="w-full p-2 border mb-2" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
            <textarea className="w-full p-2 border mb-2" placeholder="Description" value={newBook.desc} onChange={(e) => setNewBook({ ...newBook, desc: e.target.value })} />
            <input className="w-full p-2 border mb-2" placeholder="Publication" value={newBook.publication} onChange={(e) => setNewBook({ ...newBook, publication: e.target.value })} />
            <input className="w-full p-2 border mb-4" placeholder="Genre" value={newBook.genre} onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })} />
            <div className="flex justify-between">
              <button onClick={handleAddBook} className="bg-green-500 text-white p-2 rounded">Add Book</button>
              <button onClick={() => setShowModal(false)} className="bg-red-500 text-white p-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      {editModal && currentBook && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Update Book</h2>
            <input className="w-full p-2 border mb-2" placeholder="Title" value={currentBook.title} onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })} />
            <input className="w-full p-2 border mb-2" placeholder="Author" value={currentBook.author} onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })} />
            <textarea className="w-full p-2 border mb-2" placeholder="Description" value={currentBook.desc} onChange={(e) => setCurrentBook({ ...currentBook, desc: e.target.value })} />
            <input className="w-full p-2 border mb-2" placeholder="Publication" value={currentBook.publication} onChange={(e) => setCurrentBook({ ...currentBook, publication: e.target.value })} />
            <input className="w-full p-2 border mb-4" placeholder="Genre" value={currentBook.genre} onChange={(e) => setCurrentBook({ ...currentBook, genre: e.target.value })} />
            <div className="flex justify-between">
              <button onClick={handleUpdateBook} className="bg-blue-500 text-white p-2 rounded">Update</button>
              <button onClick={() => setEditModal(false)} className="bg-red-500 text-white p-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
