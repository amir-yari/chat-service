import { Col, Form, Row, Input, Button, Upload, message } from "antd";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useState } from "react";
import type { UploadProps } from "antd";
import { LinkOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons";
interface ChatMessageFooterProps {
  addMessage: (msg: string) => void;
}

const { TextArea } = Input;

// Uploading Only Images
const props: UploadProps = {
  beforeUpload: (file) => {
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  onChange: (info) => {
    console.log(info.fileList);
  },
};

const ChatMessageFooter = ({ addMessage }: ChatMessageFooterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  // {new}
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      addMessage(text);
      setText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };
  //

  const handleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };
  const handleEmoji = (
    // @ts-ignore
    event
  ) => {
    setText((prevText) => prevText + event.emoji);
  };

  return (
    <Form layout="inline" className=" max-w-[800px] mx-auto mb-4 ">
      <Row className="items-center px-3 py-2 rounded-lg bg-white dark:bg-white md:w-[600px] lg:w-[800px] justify-center">
        <Col span={2}>
          <Form.Item>
            <>
              <Button
                icon={<SmileOutlined />}
                type="text"
                onClick={handleEmojiPicker}
              >
                {isOpen && (
                  <div className="absolute bottom-[60px] left-2">
                    <Picker
                      data={data}
                      onEmojiSelect={console.log}
                      onEmojiClick={handleEmoji}
                    />
                    {/* <EmojiPicker onEmojiClick={handleEmoji} /> */}
                  </div>
                )}
              </Button>
            </>
          </Form.Item>
        </Col>

        <Col span={2}>
          <Form.Item>
            <Upload {...props}>
              <Button icon={<LinkOutlined />} type="text"></Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col span={18}>
          {" "}
          <Form.Item>
            <TextArea
              variant="borderless"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Message"
              autoSize={{ minRows: 1, maxRows: 3 }}
              onKeyDown={handleKeyDown}
            />
          </Form.Item>
        </Col>

        <Col span={2}>
          <Form.Item>
            <Button
              icon={<SendOutlined />}
              type="text"
              onClick={handleSubmit}
              aria-label="submit"
            ></Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default ChatMessageFooter;
