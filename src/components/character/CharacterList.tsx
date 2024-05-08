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
import { Character } from "../../models/character";
import {
  useCharacters,
  useOptimisticUpdateCharacter,
} from "../../utils/queries";
import { Filter } from "../../utils/types";
import FilterToolbar from "../common/filters/FilterToolbar";
import { CharacterModal } from "../modals/CharacterModal";

export const CharacterList = () => {
  const { data: characters, isLoading } = useCharacters();
  const { mutate: updateCharacter } = useOptimisticUpdateCharacter();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [modalData, setModalData] = useState<
    | {
        isModalOpen: boolean;
        characterId: string;
        setIsModalOpen: (value: boolean) => void;
        mode?: "view" | "edit";
      }
    | undefined
  >(undefined);

  const filters: Filter[] = [
    {
      field: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name...",
      onChange: () => console.log("Name filter"),
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
      onChange: () => console.log("Species filter"),
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
      onChange: () => console.log("Status filter"),
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
      onChange: () => console.log("Status filter"),
    },
  ];

  const openViewModal = (character: Character) => {
    setModalData({
      isModalOpen: true,
      characterId: character.id.toString(),
      setIsModalOpen: () => setModalData(undefined),
      mode: "view",
    });
  };

  const openEditModal = (character: Character) => {
    setModalData({
      isModalOpen: true,
      characterId: character.id.toString(),
      setIsModalOpen: () => setModalData(undefined),
      mode: "edit",
    });
  };

  const addToFavorites = (character: Character) => {
    updateCharacter({ ...character, favorite: true });
    addFavorite(character.id.toString());
  };

  const removeFromFavorites = (character: Character) => {
    updateCharacter({ ...character, favorite: false });
    removeFavorite(character.id.toString());
  };

  return (
    <>
      <Flex vertical gap="large">
        <FilterToolbar filters={filters} includeSearch />
        <Flex align="center" justify="center">
          <List
            className="character-list p-3"
            grid={{
              gutter: 20,
              xs: 2,
              sm: 3,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 8,
            }}
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
