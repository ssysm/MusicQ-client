import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import SearchService from '../services/SearchService';

export default function SearchBar(props) {
  const [keyword, setKeyword] = useState('');
  const [autocomplete, setAutocomplete] = useState([]);
  const searchService = new SearchService();

  useEffect(() => {
      if(keyword.trim() === ''){
          return;
      }
      searchService.search(keyword)
      .then(data => {
        const items = data.results.items;
        const mergedArray = [];
        for(let item of items) {
            mergedArray.push({
                label: `${item.name} by ${item.artists[0].name}`,
                value: item.uri
            })
        }
        setAutocomplete(mergedArray);
      })
      .catch(e=>{

      })
  }, [keyword]);

  const handleOnSelectTrack = ($event) => {
    props.handleEnQueue($event);
  };

  return (
    <div>
      <AutoComplete
        dropdownMatchSelectWidth={500}
        style={{ width: 250 }}
        options={autocomplete}
        onSelect={handleOnSelectTrack}
      >
        <Input.Search
        onChange={($event)=>{ setKeyword($event.target.value) }}
        size="large" placeholder="Type your track here" />
      </AutoComplete>
    </div>
  );
}
