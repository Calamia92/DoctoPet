import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const navigate = useNavigate(); 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchBarClick = () => {
    navigate('/search'); 
  };

  return (
    <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div 
        style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '450px' }}
        onClick={handleSearchBarClick} 
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Rechercher un praticien"
          style={{
            width: '100%',
            padding: '16px 24px 16px 48px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            // cursor: 'pointer'
          }}
        />
        <SearchRoundedIcon style={{ 
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#aaa'
        }} />
      </div>
    </div>
  );
};

export default SearchBar;
