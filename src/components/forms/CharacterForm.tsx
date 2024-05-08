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
import { Character } from "../../models/character";
import {
  useCharacter,
  useOptimisticUpdateCharacter,
} from "../../utils/queries";

export const CharacterForm = ({
  characterId,
  mode,
  onSubmit,
}: {
  characterId: string;
  mode: "view" | "edit";
  onSubmit: () => void;
}) => {
  const { data: character, isLoading } = useCharacter({ characterId });
  const { mutate: updateCharacter } = useOptimisticUpdateCharacter();

  const onFinish: FormProps<Character>["onFinish"] = (values: Character) => {
    updateCharacter({ ...values, id: parseInt(characterId) });
    onSubmit();
  };

  const isDisabled = useMemo(() => mode === "view", [mode]);

  return (
    <>
      {!isLoading ? (
        <Form
          name="basic"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          size="large"
        >
          <Flex justify="center">
            <Image
              src={character?.image}
              preview={false}
              className="rounded-md"
            />
          </Flex>

          <Form.Item name="name" label="Name" initialValue={character?.name}>
            <Input disabled={isDisabled} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            initialValue={character?.gender}
          >
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
              <Select.Option value="Bubasvaba">Bubasvaba</Select.Option>
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
            initialValue={character?.status}
          >
            <Select disabled={isDisabled}>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Genderless">Genderless</Select.Option>
              <Select.Option value="unknown">Unknown</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="location"
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
