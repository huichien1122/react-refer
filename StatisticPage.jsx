import { Card, Col, Row} from 'antd';
import React, { Component } from 'react';
import {Bar,Pie } from 'react-chartjs-2'


class StatiscticPage extends Component{
  constructor(){  
    super();
  this.state={
    
  }
  }
  componentDidMount(){
    
  }
  
  render() {
    const {
      statisticData
    } = this.props;


    return (
      <>
      
            <Card className="center-item profile__card" bordered={false}>
            <Bar
            data={{
              labels: ['Waste Sharing', 'Waste Sharing Request', 'Neighborhood Event', 'Neighborhood Event Request',
               'Workforce Service', 'Workforce Service Request', 'Workforce Job', 'Workforce Job Request',
               'Mutual Assistance', 'Mutual Assistance Request'],
              datasets: [
                {
                  label: '# Total Number of Services',
                  data: [(statisticData.total_ws), (statisticData.total_wsr),
                    (statisticData.total_ne), (statisticData.total_ner),
                    (statisticData.total_wfs), (statisticData.total_wfsr),
                    (statisticData.total_wfj), (statisticData.total_wfjr),
                    (statisticData.total_mas), (statisticData.total_mar),],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(238, 130, 238, 0.2)',
                    'rgba(0, 0, 255, 0.2)',
                    'rgba(255, 99, 71, 0.2)',
                    'rgba(106, 90, 205, 0.2)'
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(238, 130, 238, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(255, 99, 71, 1)',
                    'rgba(106, 90, 205, 1)'
                  ],
                  borderWidth: 1,
                },
              ],
            }}
            />
            </Card>

            <br/>
            <Row gutter={[16,16]}>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                  <span className="tt">My Waste Sharing Post ({statisticData.total_ws})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_ws_in_progress), (statisticData.total_ws_completed)],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                <span className="tt">My Waste Sharing Request ({statisticData.total_wsr})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_wsr_in_progress), (statisticData.total_wsr_completed)],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
            </Row>
            <br/>

            <Row gutter={[16,16]}>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                  <span className="tt">My Neighborhood Event Post ({statisticData.total_ne})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_ne_in_progress), (statisticData.total_ne_completed)],
                        backgroundColor: [
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
              <Col span={12}>
              <Card className="profile__card st__card" bordered={false} id="sse">
                  <span className="tt">My Neighborhood Event Request ({statisticData.total_ner})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_ner_in_progress), (statisticData.total_ner_completed)],
                        backgroundColor: [
                          'rgba(255, 206, 86, 0.2)',
                          'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 206, 86, 1)',
                          'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
            </Row>
            <br/>

            <Row gutter={[16,16]}>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                  <span className="tt">My Workforce  Service Post ({statisticData.total_wfs})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_wfs_in_progress), (statisticData.total_wfs_completed)],
                        backgroundColor: [
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                <span className="tt">My Workforce  Service Request ({statisticData.total_wfsr})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_wfsr_in_progress), (statisticData.total_wfsr_completed)],
                        backgroundColor: [
                          'rgba(153, 102, 255, 0.2)',
                          'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                          'rgba(153, 102, 255, 1)',
                          'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
            </Row>
            <br/>

            <Row gutter={[16,16]}>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                  <span className="tt">My Workforce Job Post ({statisticData.total_wfj})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_wfj_in_progress), (statisticData.total_wfj_completed)],
                        backgroundColor: [
                          'rgba(238, 130, 238, 0.2)',
                          'rgba(0, 0, 255, 0.2)',
                        ],
                        borderColor: [
                          'rgba(238, 130, 238, 1)',
                          'rgba(0, 0, 255, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                <span className="tt">My Workforce Job Request ({statisticData.total_wfjr})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_wfjr_in_progress), (statisticData.total_wfjr_completed)],
                        backgroundColor: [
                          'rgba(238, 130, 238, 0.2)',
                          'rgba(0, 0, 255, 0.2)',
                        ],
                        borderColor: [
                          'rgba(238, 130, 238, 1)',
                          'rgba(0, 0, 255, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
            </Row>

            <br/>

            <Row gutter={[16,16]}>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                  <span className="tt">My Mutual Assistance Post ({statisticData.total_ma})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_ma_in_progress), (statisticData.total_ma_completed)],
                        backgroundColor: [
                          'rgba(255, 99, 71, 0.2)',
                          'rgba(106, 90, 205, 0.2)'
                        ],
                        borderColor: [
                          'rgba(255, 99, 71, 1)',
                          'rgba(106, 90, 205, 1)'
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="profile__card st__card" bordered={false} id="sse">
                <span className="tt">My Mutual Assistance Request ({statisticData.total_mar})</span>
                  <br />
                  <Pie
                  data={{
                    labels: ['In Progress', 'Complete'],
                    datasets: [
                      {
                        label: '# Total Number of Services',
                        data: [(statisticData.total_mar_in_progress), (statisticData.total_mar_completed)],
                        backgroundColor: [
                          'rgba(255, 99, 71, 0.2)',
                          'rgba(106, 90, 205, 0.2)'
                        ],
                        borderColor: [
                          'rgba(255, 99, 71, 1)',
                          'rgba(106, 90, 205, 1)'
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                  />
                </Card>
              </Col>
            </Row>
      </>
    )
  }
}

export default StatiscticPage;