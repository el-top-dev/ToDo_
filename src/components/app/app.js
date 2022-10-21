import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter'
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import '../app/app.css';
import '../app-header/app-header.css';
import '../post-add-form/post-add-form.css';
import '../post-list/post-list.css';
import '../post-list-item/post-list-item.css';
import '../post-status-filter/post-status-filter.css';
import '../search-panel/search-panel.css';
// import PostListItem from '../post-list-item';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px; 
`;
export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn React', importannt: false, like: false, id: 1},
                {label: 'There is so good', importannt: false, like: false, id: 2},
                {label: 'Hello everyone', importannt: false, like: false, id: 3}
            ],
            tern: '',
            filter: 'all'
        }
        this.maxId = 4;
        this.delItem = this.delItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.searchPosts = this.searchPosts.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
    }

    delItem(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const before = data.slice(0, index);
            const after = data.slice(index + 1);

            const newArray = [...before, ...after];
            return{
                data: newArray
            }
        });
    }

    addItem(text){
        const newItem = {
            label: text,
            inportant: false,
            id: this.maxId++
        }
        this.setState(({data})=>{
            const newArray = [...data, newItem]
            return{
                data: newArray
            }
        })
    }

    onToggleImportant(id){
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, importannt: !old.importannt};
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return{
                data: newArray
            }
        })
    }

    onToggleLiked(id){
            this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);
            const old = data[index];
            const newItem = {...old, like: !old.like};
            const newArray = [...data.slice(0, index), newItem, ...data.slice(index + 1)];
            return{
                data: newArray
            }
        })
    }

    searchPosts(items, tern){
        if(tern.length === 0){
            return items
        }

        return items.filter((item)=>{
            return item.label.indexOf(tern) > -1
        });
    }

    filterPosts(items, filter){
        if(filter === 'like'){
            return items.filter(item => item.like)
        }else{
            return items
        }
    }

    onUpdateSearch(tern){
        this.setState({
            tern: tern
        })
    }

    onFilterSelect(filter){
        this.setState({filter})
    }

    render(){

        const liked = this.state.data.filter(item => item.like).length;
        const allPosts = this.state.data.length;

        const visiblePosts = this.filterPosts(this.searchPosts(this.state.data, this.state.tern), this.state.filter);

        return (
            <AppBlock>
                   <AppHeader
                   liked = {liked}
                   allPosts = {allPosts}
                   />
               <div className = "search-panel d-flex">
                   <SearchPanel
                   onUpdateSearch = {this.onUpdateSearch}
                   />
                   <PostStatusFilter
                   filter = {this.state.filter}
                   onFilterSelect = {this.onFilterSelect}
                   />
               </div>
               <PostList 
                   posts = {visiblePosts}
                   onDelete = {this.delItem}
                   onToggleImportant = {this.onToggleImportant}
                   onToggleLiked = {this.onToggleLiked}
                   />
               <PostAddForm
               onAdd = {this.addItem}
               />
            </AppBlock>
               
           )
    }
 
}
