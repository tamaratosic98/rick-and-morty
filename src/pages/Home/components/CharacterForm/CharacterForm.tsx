import {
  Button,
  Flex,
  Form,
  FormProps,
  Image,
  Input,
  Select,
  Spin,
} from "antd";
import { useMemo } from "react";
import { CharacterFormMode } from "../../../../modules/character/character.constants";
import {
  useCharacter,
  useOptimisticUpdateCharacter,
} from "../../../../modules/character/character.queries";
import { characterStore } from "../../../../modules/character/character.store";
import { Character } from "../../../../modules/character/character.types";

export const CharacterForm = ({
  characterId,
  mode,
  onSubmit,
  filters,
  currentPage,
  query,
}: {
  characterId: string;
  mode: CharacterFormMode;
  onSubmit: () => void;
  filters: Partial<Character>;
  currentPage: number;
  query: string;
}) => {
  const { mutate: updateCharacter } = useOptimisticUpdateCharacter();

  const isCharactedModified = useMemo(
    () => characterStore.modifiedCharacters.has(parseInt(characterId)),
    [characterId]
  );

  const { data: character, isLoading } = useCharacter({
    characterId,
    isModified: isCharactedModified,
  });

  const onFinish: FormProps<
    Character & { locationName: string }
  >["onFinish"] = (values: Character & { locationName: string }) => {
    const newLocation = {
      name: values.locationName,
      url: character?.location?.url ?? "",
    };

    updateCharacter({
      newCharacter: {
        ...(values ?? {}),
        id: parseInt(characterId),
        location: newLocation,
      },
      filters,
      page: currentPage,
      query,
    });

    onSubmit();
  };

  const isDisabled = useMemo(() => mode === CharacterFormMode.VIEW, [mode]);

  return (
    <>
      {!isLoading ? (
        <Form
          name="basic"
          onFinish={onFinish}
          layout="horizontal"
          autoComplete="off"
          size="large"
        >
          <Flex justify="center" className="pb-10">
            <Image
              src={character?.image}
              preview={false}
              className="rounded-md"
              width={150}
            />
          </Flex>

          <Form.Item name="name" label="Name" initialValue={character?.name}>
            <Input disabled={isDisabled} />
          </Form.Item>

          <Form.Item
            name="species"
            label="Species"
            initialValue={character?.species}
          >
            <Select disabled={isDisabled}>
              <Select.Option value="Human">Human</Select.Option>
              <Select.Option value="Alien">Alien</Select.Option>
              <Select.Option value="unknown">Unknown</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            initialValue={character?.status}
          >
            <Select disabled={isDisabled}>
              <Select.Option value="Dead">Dead</Select.Option>
              <Select.Option value="Alive">Alive</Select.Option>
              <Select.Option value="unknown">Unknown</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            initialValue={character?.gender}
          >
            <Select disabled={isDisabled}>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Genderless">Genderless</Select.Option>
              <Select.Option value="unknown">Unknown</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="locationName"
            label="Location Name"
            initialValue={character?.location?.name}
          >
            <Input disabled={isDisabled} />
          </Form.Item>

          {!isDisabled && (
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          )}
        </Form>
      ) : (
        <Spin />
      )}
    </>
  );
};
