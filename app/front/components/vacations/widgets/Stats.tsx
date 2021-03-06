import * as React from 'react'
import * as moment from 'moment'
import { Card } from 'antd'

import Vacation from 'model/Vacation'

import Container from './StatsContainer'


export interface Props {
    vacations: Vacation[]
}

export class Stats extends React.PureComponent<Props, {}> {

    render() {
        const { vacations } = this.props

        return (
            <Card title={'Статистика'}>
                <p>Coming soon...</p>
            </Card>
        )
    }
}

export default Container(Stats)
