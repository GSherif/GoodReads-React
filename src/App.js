import React, { Component } from 'react';
import AuthorsData from '../src/Data/Authers';
import AuthorsAdminListing from '../src/FeaturedComponents/Admin/Auther/Listing';
import UsersData from './Data/Users.json';
import { SignUpForm } from './FeaturedComponents/UserForms/signup';

import BooksData from '../src/Data/Books';
import BooksDisplayListing from '../src/FeaturedComponents/Featured/Book/Listing';
import BookDetails from '../src/FeaturedComponents/Featured/Book/Details';

export const context = React.createContext();
class App extends Component {
  constructor() {
    super();
    this.state = {
      Authors: AuthorsData.slice(),
      Users: UsersData.slice(),
      Books: BooksData.slice(),
    }
    this.addAuthor = this.addAuthor.bind(this);
    this.editAuthor = this.editAuthor.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.addUser = this.addUser.bind(this);
  }


  addAuthor(author) {
    const newAuthors = this.state.Authors.slice();
    this.setState({ Authors: [...newAuthors.concat(author)] });
  }
  editAuthor(author) {
    console.log(author);
    const newAuthors = this.state.Authors.slice();
    let authorEdited = newAuthors.findIndex(a => a.id === author.id);
    newAuthors[authorEdited] = author;

    this.setState({ Authors: [...newAuthors] });
  }
  deleteAuthor(authorID) {
    const newAuthors = this.state.Authors.slice();
    newAuthors.find(a => a.id === authorID).deleted = true
    this.setState({ Authors: [...newAuthors] });
  }
  
  addUser(user) {
    const newUsers = this.state.Users.slice();
    this.setState({Users: [...newUsers.concat(user)]});
  }

  render() {
    const contextValue = {
      authors: this.state.Authors,
      addAuthor: this.addAuthor,
      editAuthor: this.editAuthor,
      deleteAuthor: this.deleteAuthor,

      books: this.state.Books,
      addUser: this.addUser,
    }
    return (
      <context.Provider value={contextValue}>
      <SignUpForm/>
        {/* <AuthorsAdminListing /> */}
        {/* <BooksDisplayListing /> */}
        <BookDetails {...contextValue.books[1]} />
      </context.Provider>
    );
  }
}

export default App;
