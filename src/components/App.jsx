import { Component } from "react"

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { getImages } from '../services/api';
import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";



export class App extends Component {

  state = {
    searchName: '',
    page: 1,
    items: [],
    loader: false

  }

  componentDidUpdate(_, prevState) { 
    const { searchName, page } = this.state;

    if (prevState.page !== this.state.page ||
      prevState.searchName !== this.state.searchName
    ) {
      this.setState({ loader: true})

      getImages(searchName, page).then(res => (
        this.setState({
          items: res,
          loader: false})
       ));
      
    }
  } 

  hendeleSubmitSearchForm = ({name}) => {
    this.setState({
      searchName: name,
      page: 1,
      items: []
    })
  }

  loadMore = () => {
    this.setState(pS => ({
      page: pS.page + 1
    }))
  }

  render() {
    const {items, loader} = this.state;

    return (
      <>
        <Searchbar onSubmit={this.hendeleSubmitSearchForm} />

        {loader && <Loader/>}

        <ImageGallery >
            <ImageGalleryItem items={items}/>
        </ImageGallery>

        <Button onClick={this.loadMore}>Load More</Button>

        
      </>
    );
  }
  
};
