import {
  EditOutlined,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, Flex, Image, List } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import { Character, Gender, Status } from "../../models/character";
import { useOptimisticUpdateCharacter } from "../../utils/queries";
import { Filter } from "../../utils/types";
import FilterToolbar from "../common/filters/FilterToolbar";
import { CharacterModal } from "../modals/CharacterModal";

export const CharacterList = ({
  characters,
  isLoading,
  setFilters,
  filters,
}: {
  characters: Character[];
  isLoading: boolean;
  filters: Partial<Character>;
  setFilters: (filters: Partial<Character>) => void;
}) => {
  const { mutate: updateCharacter } = useOptimisticUpdateCharacter();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [modalData, setModalData] = useState<
    | {
        isModalOpen: boolean;
        characterId: string;
        setIsModalOpen: (value: boolean) => void;
        mode?: "view" | "edit";
        filters: Partial<Character>;
      }
    | undefined
  >(undefined);

  const filterItems: Filter[] = [
    {
      field: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name...",
      onChange: (value) => setFilters?.({ name: value }),
    },
    {
      field: "species",
      label: "Species",
      type: "select",
      placeholder: "Select species...",
      options: [
        { label: "Human", value: "human" },
        { label: "Alien", value: "alien" },
        { label: "unknown", value: "unknown" },
      ],
      onChange: (value) => setFilters?.({ species: value }),
    },
    {
      field: "status",
      label: "Status",
      type: "select",
      placeholder: "Select status...",
      options: [
        { label: "Alive", value: "alive" },
        { label: "Dead", value: "dead" },
        { label: "unknown", value: "unknown" },
      ],
      onChange: (value) => setFilters?.({ status: value as Status }),
    },
    {
      field: "gender",
      label: "Gender",
      type: "select",
      placeholder: "Select gender...",
      options: [
        { label: "Female", value: "female" },
        { label: "Male", value: "male" },
        { label: "Genderless", value: "genderless" },
        { label: "unknown", value: "unknown" },
      ],
      onChange: (value) => setFilters?.({ gender: value as Gender }),
    },
  ];

  const openViewModal = (character: Character) => {
    setModalData({
      isModalOpen: true,
      characterId: character.id.toString(),
      setIsModalOpen: () => setModalData(undefined),
      mode: "view",
      filters,
    });
  };

  const openEditModal = (character: Character) => {
    setModalData({
      isModalOpen: true,
      characterId: character.id.toString(),
      setIsModalOpen: () => setModalData(undefined),
      mode: "edit",
      filters,
    });
  };

  const addToFavorites = (character: Character) => {
    updateCharacter({
      newCharacter: { ...character, favorite: true },
      filters,
    });
    addFavorite(character.id.toString());
  };

  const removeFromFavorites = (character: Character) => {
    updateCharacter({
      newCharacter: { ...character, favorite: false },
      filters,
    });
    removeFavorite(character.id.toString());
  };

  const getGridColumns = (num: number) => {
    return Math.min(characters.length, num);
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
        <FilterToolbar filters={filterItems} includeSearch />
        <Flex justify={characters.length ? "start" : "center"}>
          <List
            className="character-list p-3"
            grid={calculateGridColumns()}
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={characters}
            renderItem={(item) => (
              <List.Item>
                {
                  <Card
                    onClick={() => openViewModal(item)}
                    cover={
                      <Image preview={false} alt={item.name} src={item.image} />
                    }
                    actions={[
                      <EyeOutlined
                        key="view"
                        onClick={() => openViewModal(item)}
                      />,
                      <EditOutlined
                        key="edit"
                        onClick={(event) => {
                          event.stopPropagation();
                          openEditModal(item);
                        }}
                      />,
                      item.favorite || isFavorite(item.id.toString()) ? (
                        <HeartFilled
                          key="remove-from-favorites"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeFromFavorites(item);
                          }}
                        />
                      ) : (
                        <HeartOutlined
                          key="add-to-favorites"
                          onClick={(event) => {
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
