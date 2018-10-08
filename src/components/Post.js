import {Comment, Icon, Segment, Header, Image, Container, Form, Button} from 'semantic-ui-react';
import {Component} from "react";
import "./Post.css"
import React from "react";

class Post extends Component {
  render() {
    return (
      <div className="post">
        <Segment vertical>
          <Header as='h2'>
            <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png'/> Patrick
          </Header>
        </Segment>
        <Segment vertical>
          <Header as='h2'>Dogs Roles with Humans</Header>
          <Container fluid>
            <p>
              Domestic dogs inherited complex behaviors, such as bite inhibition, from their wolf
              ancestors, which would have been pack hunters with complex body language. These
              sophisticated forms of social cognition and communication may account for their
              trainability, playfulness, and ability to fit into human households and social situations,
              and these attributes have given dogs a relationship with humans that has enabled them to
              become one of the most successful species on the planet today.
            </p>
            <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small' centered/>
            <p>
              The dogs' value to early human hunter-gatherers led to them quickly becoming ubiquitous
              across world cultures. Dogs perform many roles for people, such as hunting, herding, pulling
              loads, protection, assisting police and military, companionship, and, more recently, aiding
              handicapped individuals. This impact on human society has given them the nickname "man's
              best friend" in the Western world. In some cultures, however, dogs are also a source of
              meat.
            </p>
          </Container>
        </Segment>
        <Segment>
          <Comment.Group threaded>
            <Header as='h3' dividing>
              Comments
            </Header>

            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
              <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                  <span>Today at 5:42PM</span>
                </Comment.Metadata>
                <Comment.Text>How artistic!</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                  <Comment.Action>
                    <Icon link name='triangle up'/>
                    5
                  </Comment.Action>
                  <Comment.Action>
                    <Icon link name='triangle down'/>
                    5
                  </Comment.Action>
                </Comment.Actions>
                <Form reply>
                  <Form.TextArea/>
                  <Button content='Add Reply' labelPosition='left' icon='edit' primary/>
                </Form>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'/>
              <Comment.Content>
                <Comment.Author as='a'>Elliot Fu</Comment.Author>
                <Comment.Metadata>
                  <span>Yesterday at 12:30AM</span>
                </Comment.Metadata>
                <Comment.Text>
                  <p>This has been very useful for my research. Thanks as well!</p>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                  <Comment.Action>
                    <Icon link name='triangle up'/>
                    5
                  </Comment.Action>
                  <Comment.Action>
                    <Icon link name='triangle down'/>
                    5
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>

              <Comment.Group>
                <Comment>
                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'/>
                  <Comment.Content>
                    <Comment.Author as='a'>Jenny Hess</Comment.Author>
                    <Comment.Metadata>
                      <span>Just now</span>
                    </Comment.Metadata>
                    <Comment.Text>Elliot you are always so right :)</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                      <Comment.Action>
                        <Icon link name='triangle up'/>
                        5

                      </Comment.Action>
                      <Comment.Action>
                        <Icon link name='triangle down'/>
                        5
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Comment>

            <Comment>
              <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'/>
              <Comment.Content>
                <Comment.Author as='a'>Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <span>5 days ago</span>
                </Comment.Metadata>
                <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                  <Comment.Action>
                    <Icon link name='triangle up'/>
                    5
                  </Comment.Action>
                  <Comment.Action>
                    <Icon link name='triangle down'/>
                    5
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>

            <Form reply>
              <Form.TextArea/>
              <Button content='Add Comment' labelPosition='left' icon='edit' primary/>
            </Form>
          </Comment.Group>
        </Segment>
      </div>
    );
  }
}

export default Post;