import { Button, Flex, Form, FormProps, Image, Input, Spin } from "antd";
import { useMemo } from "react";
import { Character } from "../../models/character";
import { useCharacter } from "../../utils/queries";

export const CharacterForm = ({
  characterId,
  mode,
}: {
  characterId: string;
  mode: "view" | "edit";
}) => {
  const { data: character, isLoading } = useCharacter({ characterId });

  const onFinish: FormProps<Character>["onFinish"] = (values: Character) => {};

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
            <Input disabled={isDisabled} />
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
