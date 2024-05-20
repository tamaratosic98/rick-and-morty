import { EditOutlined, EyeOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Card, Flex, Image, List } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useState } from 'react';
import FilterToolbar from '../../../../components/Filter/FilterToolbar';
import { CharacterFormMode, MAX_CHARACTERS_PER_PAGE } from '../../../../modules/character/character.constants';
import { useFavorites } from '../../../../modules/character/character.hooks';
import { characterKeys } from '../../../../modules/character/character.keys';
import { useOptimisticUpdateCharacter } from '../../../../modules/character/character.queries';
import { Character, Gender, Status } from '../../../../modules/character/character.types';
import { Filter } from '../../../../utils/types';
import { CharacterModal } from '../CharacterModal/CharacterModal';
import './CharacterList.css';
export const CharacterList = ({
  characters,
  isLoading,
  setFilters,
  filters,
  setQuery,
  setPage,
  totalPages,
  currentPage,
  query,
}: {
  characters: Character[];
  isLoading: boolean;
  filters: Partial<Character>;
  setFilters: (filters: Partial<Character>) => void;
  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  currentPage: number;
  totalPages?: number;
  query: string;
}) => {
  const { mutate: updateCharacter } = useOptimisticUpdateCharacter();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [modalData, setModalData] = useState<
    | {
        isModalOpen: boolean;
        characterId: string;
        setIsModalOpen: (value: boolean) => void;
        mode?: CharacterFormMode;
        filters: Partial<Character>;
        currentPage: number;
        query: string;
      }
    | undefined
  >(undefined);

  const filterItems: Filter[] = [
    {
      field: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter name...',
      onChange: value => setFilters?.({ name: value }),
    },
    {
      field: 'species',
      label: 'Species',
      type: 'select',
      placeholder: 'Select species...',
      options: [
        { label: 'Human', value: 'human' },
        { label: 'Alien', value: 'alien' },
        { label: 'unknown', value: 'unknown' },
      ],
      onChange: value => setFilters?.({ species: value }),
    },
    {
      field: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Select status...',
      options: [
        { label: 'Alive', value: 'alive' },
        { label: 'Dead', value: 'dead' },
        { label: 'unknown', value: 'unknown' },
      ],
      onChange: value => setFilters?.({ status: value as Status }),
    },
    {
      field: 'gender',
      label: 'Gender',
      type: 'select',
      placeholder: 'Select gender...',
      options: [
        { label: 'Female', value: 'female' },
        { label: 'Male', value: 'male' },
        { label: 'Genderless', value: 'genderless' },
        { label: 'unknown', value: 'unknown' },
      ],
      onChange: value => setFilters?.({ gender: value as Gender }),
    },
  ];

  const openViewModal = (character: Character) => {
    setModalData({
      isModalOpen: true,
      characterId: character?.id?.toString(),
      setIsModalOpen: () => setModalData(undefined),
      mode: CharacterFormMode.VIEW,
      filters,
      currentPage,
      query,
    });
  };

  const openEditModal = (character: Character) => {
    setModalData({
      isModalOpen: true,
      characterId: character?.id?.toString(),
      setIsModalOpen: () => setModalData(undefined),
      mode: CharacterFormMode.EDIT,
      filters,
      currentPage,
      query,
    });
  };

  const addToFavorites = (character: Character) => {
    updateCharacter({
      newCharacter: { ...(character ?? {}), favorite: true },
      filters,
      page: currentPage,
      query,
    });
    addFavorite(character?.id?.toString());
  };

  const queryClient = useQueryClient();

  const removeFromFavorites = (character: Character) => {
    updateCharacter({
      newCharacter: { ...(character ?? {}), favorite: false },
      filters,
      page: currentPage,
      query,
    });

    removeFavorite(character?.id?.toString());

    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: characterKeys?.favoritesList({
          filters,
          query,
          page: currentPage,
        }).queryKey,
      });
    });
  };

  const getGridColumns = (num: number) => {
    return Math.min(characters?.length, num);
  };

  const calculateGridColumns = () => {
    return {
      gutter: 20,
      xs: getGridColumns(2),
      sm: getGridColumns(3),
      md: getGridColumns(4),
      lg: getGridColumns(4),
      xl: getGridColumns(6),
      xxl: getGridColumns(6),
    };
  };

  return (
    <>
      <Flex vertical gap="large">
        <FilterToolbar filters={filterItems} onSearch={setQuery} includeSearch applyAllHandler={setFilters} />
        <Flex justify={characters.length ? 'start' : 'center'} className="w-full">
          <List
            className="character-list p-3"
            grid={calculateGridColumns()}
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={characters}
            pagination={{
              position: 'bottom',
              align: 'start',
              onChange: page => {
                setPage(page);
              },
              pageSize: MAX_CHARACTERS_PER_PAGE,
              total: totalPages ? totalPages * MAX_CHARACTERS_PER_PAGE : undefined,
            }}
            renderItem={item => (
              <List.Item>
                {
                  <Card
                    onClick={() => openViewModal(item)}
                    cover={<Image preview={false} alt={item.name} src={item.image} />}
                    actions={[
                      <EyeOutlined key={CharacterFormMode.VIEW} onClick={() => openViewModal(item)} />,
                      <EditOutlined
                        key={CharacterFormMode.EDIT}
                        onClick={event => {
                          event.stopPropagation();
                          openEditModal(item);
                        }}
                      />,
                      item.favorite || isFavorite(item.id.toString()) ? (
                        <HeartFilled
                          key="remove-from-favorites"
                          onClick={event => {
                            event.stopPropagation();
                            removeFromFavorites(item);
                          }}
                        />
                      ) : (
                        <HeartOutlined
                          key="add-to-favorites"
                          onClick={event => {
                            event.stopPropagation();
                            addToFavorites(item);
                          }}
                        />
                      ),
                    ]}
                    hoverable
                  >
                    <Meta title={item.name} description={item.species} />
                  </Card>
                }
              </List.Item>
            )}
          />
        </Flex>
      </Flex>
      {modalData && <CharacterModal {...modalData} />}
    </>
  );
};
