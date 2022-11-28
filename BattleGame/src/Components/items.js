import { Card, Button, CardContent, CardActions, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const Item = styled('div')(({ theme }) => ({
    textAlign: 'center',
  }));

export const Items = (props) => {
    const {stage, dispatch, idx} = props

    let itemList = [{name:'Steel Armor', effect:"+2 Def to Humans", targets:"Human", cost:500}, 
                    {name:'Oak Slingshots', effect:"+1 Def to Hobbits", targets:"Hobbit", cost:150}, 
                    {name:'Poison Arrows', effect:"+2 Str to Elves", targets:"Elf", cost:400},
                    {name:'Combat Training', effect:"+10 to hit for Humans", targets:"Human", cost:300},
                    {name:'Magic Sight', effect:"+5 to hit for Elves", targets:"Elf", cost:200},
                    {name:'Healing Potion', effect:"Heal one unit", targets:"Party", cost:100+(50*stage)}]
            
    let index = Math.floor(Math.random() * 6)

    return (
        <Card sx={{ width:250, border: 2, bordercolor:'white'}}>
            <CardContent>
                    <Grid container>
                        <Item>
                            Item Name: {itemList[index].name}
                        </Item>
                    </Grid>
                    <Grid container>
                        <Item>
                            Effect: {itemList[index].effect}
                        </Item>
                    </Grid>
            </CardContent>
            <CardActions>
                    <Button size="small" onClick={()=>dispatch()}>Purchase Item: {itemList[index].cost} gold</Button>
            </CardActions>
        </Card>
    )
}
