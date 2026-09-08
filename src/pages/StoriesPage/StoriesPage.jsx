import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '@/components/molecules/SearchBar';
import StoryGrid from '@/components/organisms/StoryGrid';
import Typography from '@/components/atoms/Typography';
import { useGetStoriesQuery } from '@/features/stories/storiesApi';
import {
  setSearchTerm,
  setCategory,
  setAgeGroup,
  selectStoryFilters,
} from '@/features/stories/storiesSlice';
import { useDebounce } from '@/hooks/useDebounce';

export default function StoriesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector(selectStoryFilters);

  // Debounce the search term so we don't fire a request per keystroke
  const debouncedSearch = useDebounce(filters.searchTerm, 400);

  const { data: stories, isLoading, isFetching, isError } = useGetStoriesQuery({
    search: debouncedSearch,
    category: filters.category,
    ageGroup: filters.ageGroup,
    sortBy: filters.sortBy,
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <Typography variant="h2">Explore Stories 📚</Typography>
        <SearchBar
          value={filters.searchTerm}
          onChange={(v) => dispatch(setSearchTerm(v))}
          placeholder="Search for magical stories..."
        />
      </div>

      <StoryGrid
        stories={stories || []}
        isLoading={isLoading || isFetching}
        isError={isError}
        onStoryClick={(story) => navigate(`/stories/${story.id || story._id}`)}
      />
    </div>
  );
}