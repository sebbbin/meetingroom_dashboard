import React, { useState } from 'react';

const ConferenceRoomDashboard = () => {
  // 층별 회의실 데이터 구성
  const floorData = {
    '4': ['4-1', '4-2', '4-4', '4-7', '4-9', '4-10', '4-11', '4-12'],
    '10': ['10-1', '10-2', '10-3'],
    '11': ['11-6', '11-7', '11-8', '11-9', '11-10', '11-11', '11-12', '11-13'],
    '12': ['12-1', '12-2', '12-3', '12-4', '12-5', '12-6', '12-7'],
    '13': ['13-1', '13-2', '13-5', '13-6', '13-7'],
    '22': ['22-1', '22-2', '22-3', '22-4', '22-8', '22-9', '22-10', '22-11', '22-12', '22-13'],
    '23': ['23-1', '23-2', '23-3', '23-4', '23-5', '23-6', '23-7']
  };
  
  // 모든 회의실 번호 목록 생성
  const roomNumbers = Object.values(floorData).flat();

  // 회의실 데이터 초기화 (실제 번호 사용)
  const [rooms, setRooms] = useState(
    roomNumbers.map((roomNumber, index) => ({
      id: index + 1,
      roomNumber: roomNumber,
      floor: roomNumber.split('-')[0],
      status: Math.random() > 0.5 ? 'on' : 'off',
      pairing: Math.random() > 0.7,
    }))
  );

  // 필터 상태 (all, on, off)
  const [filter, setFilter] = useState('all');
  
  // 토글된 층 상태 관리 (어떤 층이 펼쳐져 있는지)
  const [expandedFloors, setExpandedFloors] = useState({});
  
  // 선택된 회의실 ID
  const [selectedRoom, setSelectedRoom] = useState(null);
  // 확장된 회의실 ID
  const [expandedRoom, setExpandedRoom] = useState(null);

  // 층 토글 함수
  const toggleFloor = (floor) => {
    setExpandedFloors(prev => ({
      ...prev,
      [floor]: !prev[floor]
    }));
  };

  // 회의실 상태 토글
  const toggleRoomStatus = (roomId) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, status: room.status === 'on' ? 'off' : 'on' } : room
      )
    );
  };

  // API 호출 예시 함수들
  const apiToggleRoomStatus = async (roomId, newStatus) => {
    console.log(`API 호출: 회의실 ${roomId} 상태를 ${newStatus}로 변경`);
    // 테스트용 즉시 상태 변경
    toggleRoomStatus(roomId);
  };
  
  const apiTogglePairing = async (roomId, pairingStatus) => {
    console.log(`API 호출: 회의실 ${roomId} 페어링 상태를 ${pairingStatus}로 변경`);
    // 테스트용 즉시 상태 변경
    togglePairing(roomId);
  };
  
  const apiIncreaseVolume = async (roomId) => {
    console.log(`API 호출: 회의실 ${roomId} 소리 키우기`);
  };
  
  const apiDecreaseVolume = async (roomId) => {
    console.log(`API 호출: 회의실 ${roomId} 소리 줄이기`);
  };
  
  const apiTurnOnMic = async (roomId) => {
    console.log(`API 호출: 회의실 ${roomId} 마이크 켜기`);
  };
  
  const apiTurnOffMic = async (roomId) => {
    console.log(`API 호출: 회의실 ${roomId} 마이크 끄기`);
  };
  
  // 페어링 상태 토글
  const togglePairing = (roomId) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, pairing: !room.pairing } : room
      )
    );
  };

  // 온/오프 회의실 수 계산
  const onRooms = rooms.filter(room => room.status === 'on');
  const onRoomsCount = onRooms.length;
  const offRoomsCount = rooms.filter(room => room.status === 'off').length;

  // 각 층별 상태 계산
  const floorStats = {};
  Object.keys(floorData).forEach(floor => {
    const floorRooms = rooms.filter(room => room.floor === floor);
    floorStats[floor] = {
      total: floorRooms.length,
      on: floorRooms.filter(r => r.status === 'on').length,
      off: floorRooms.filter(r => r.status === 'off').length
    };
  });

  // 메인 색상
  const mainColor = '#3182F6';

  // 룸 확장 토글
  const toggleRoomExpand = (roomId, e) => {
    e.stopPropagation();
    if (expandedRoom === roomId) {
      setExpandedRoom(null);
    } else {
      setExpandedRoom(roomId);
    }
    // 설정 패널은 닫기
    setSelectedRoom(null);
  };

  // 필터링된 회의실
  const getFilteredRooms = (floor) => {
    return rooms.filter(room => {
      // 층 필터
      if (room.floor !== floor) return false;
      
      // 상태 필터
      if (filter !== 'all' && room.status !== filter) return false;
      
      return true;
    });
  };

  // 인라인 스타일 정의
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      padding: '1.5rem'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#1f2937'
    },
    statusBox: {
      marginBottom: '1.5rem',
      borderRadius: '0.75rem',
      overflow: 'hidden',
      boxShadow: '0 4px 15px -3px rgba(49, 130, 246, 0.15), 0 2px 6px -2px rgba(49, 130, 246, 0.1)',
      backgroundColor: mainColor,
      color: 'white'
    },
    statusContent: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem'
    },
    statusText: {
      fontSize: '1.25rem'
    },
    statusBold: {
      fontWeight: 'bold'
    },
    buttonContainer: {
      display: 'flex', 
      gap: '0.75rem',
      marginBottom: '1.5rem'
    },
    button: {
      padding: '0.5rem 1.25rem',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: 'none',
      fontWeight: '500'
    },
    buttonActive: {
      backgroundColor: mainColor,
      color: 'white'
    },
    buttonInactive: {
      backgroundColor: 'white',
      color: '#333333'
    },
    floorToggle: {
      width: '100%',
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      border: 'none',
      textAlign: 'left',
      fontSize: '1.125rem',
      fontWeight: '600',
      color: '#1f2937',
      transition: 'all 0.2s ease'
    },
    floorToggleActive: {
      backgroundColor: '#f0f7ff',
      borderLeft: `4px solid ${mainColor}`,
    },
    floorContent: {
      marginBottom: '1.5rem',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '1rem',
      padding: '0.5rem 0.5rem 1rem 0.5rem'
    },
    roomCard: {
      position: 'relative',
      borderRadius: '0.75rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      backgroundColor: 'white',
      cursor: 'pointer',
      padding: '1rem',
      borderLeft: '4px solid transparent',
      transition: 'all 0.2s ease'
    },
    expandedCard: {
      minHeight: '240px',
      backgroundColor: '#f0f7ff',
      gridRow: 'span 2',
      zIndex: 10,
      boxShadow: '0 4px 15px rgba(49, 130, 246, 0.15)'
    },
    roomHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0.5rem'
    },
    roomHeaderContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.5rem'
    },
    roomTitle: {
      fontWeight: 'bold',
      fontSize: '1rem',
      color: '#1a202c'
    },
    statusIndicator: {
      width: '0.75rem',
      height: '0.75rem',
      borderRadius: '50%',
      display: 'inline-block',
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.1)'
    },
    location: {
      fontSize: '0.75rem',
      color: '#6b7280',
      marginLeft: '0.25rem'
    },
    roomControls: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '0.75rem',
    },
    pairingButton: {
      fontSize: '0.875rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      border: 'none',
      cursor: 'pointer',
      height: '1.75rem',
      backgroundColor: 'rgba(49, 130, 246, 0.1)',
      color: mainColor,
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    expandToggle: {
      border: 'none',
      backgroundColor: 'transparent',
      color: mainColor,
      cursor: 'pointer',
      fontSize: '0.875rem',
      padding: '0.25rem 0.75rem',
      margin: '0.25rem auto',
      textAlign: 'center',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    expandButtons: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginTop: '0.75rem',
      padding: '0.25rem'
    },
    expandButtonsRow: {
      display: 'flex',
      width: '100%',
      gap: '0.5rem'
    },
    expandButton: {
      backgroundColor: 'rgba(49, 130, 246, 0.08)',
      color: '#3182F6',
      border: 'none',
      padding: '0.5rem 0.75rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '0.875rem',
      flex: 1,
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    closeExpandButton: {
      border: 'none',
      backgroundColor: 'transparent',
      color: mainColor,
      cursor: 'pointer',
      fontSize: '0.875rem',
      textAlign: 'right',
      marginTop: '0.5rem',
      width: '100%',
      fontWeight: '500',
      transition: 'all 0.2s ease'
    },
    statsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    statBadge: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    onBadge: {
      backgroundColor: 'rgba(49, 130, 246, 0.15)',
      color: mainColor
    },
    offBadge: {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      color: '#10b981'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>회의실 대시보드</h1>
      
      {/* 상태 요약 */}
      <div style={styles.statusBox}>
        <div style={styles.statusContent}>
          <div style={styles.statusText}>
            전체 상태: <span style={styles.statusBold}>{onRoomsCount}개 회의실 사용 중</span>
          </div>
          <div style={styles.statusText}>
            사용 가능 회의실: <span style={styles.statusBold}>{offRoomsCount}개</span>
          </div>
        </div>
      </div>
      
      {/* 필터 버튼 */}
      <div style={styles.buttonContainer}>
        <button
          style={{
            ...styles.button,
            ...(filter === 'all' ? styles.buttonActive : styles.buttonInactive)
          }}
          onClick={() => setFilter('all')}
        >
          전체 보기
        </button>
        <button
          style={{
            ...styles.button,
            ...(filter === 'on' ? styles.buttonActive : styles.buttonInactive)
          }}
          onClick={() => setFilter('on')}
        >
          사용 중 회의실
        </button>
        <button
          style={{
            ...styles.button,
            ...(filter === 'off' ? styles.buttonActive : styles.buttonInactive)
          }}
          onClick={() => setFilter('off')}
        >
          사용 가능 회의실
        </button>
      </div>

      {/* 층별 토글 섹션 */}
      <div>
        {Object.keys(floorData).map(floor => {
          const filteredRoomsForFloor = getFilteredRooms(floor);
          const isExpanded = expandedFloors[floor];
          
          return (
            <div key={floor}>
              {/* 층 토글 버튼 */}
              <button 
                style={{
                  ...styles.floorToggle,
                  ...(isExpanded ? styles.floorToggleActive : {})
                }}
                onClick={() => toggleFloor(floor)}
              >
                <span>{floor}층 회의실</span>
                <div style={styles.statsContainer}>
                  <span style={{
                    ...styles.statBadge, 
                    ...styles.onBadge
                  }}>
                    사용 중: {floorStats[floor].on}
                  </span>
                  <span style={{
                    ...styles.statBadge, 
                    ...styles.offBadge
                  }}>
                    사용 가능: {floorStats[floor].off}
                  </span>
                  <span style={{marginLeft: '0.5rem'}}>
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>
              </button>
              
              {/* 층 내용 (토글로 확장/축소) */}
              {isExpanded && (
                <div style={styles.floorContent}>
                  {filteredRoomsForFloor.length > 0 ? (
                    <div style={styles.gridContainer}>
                      {filteredRoomsForFloor.map((room) => (
                        <div
                          key={room.id}
                          style={{
                            ...styles.roomCard,
                            borderLeft: room.status === 'on' ? `4px solid ${mainColor}` : '4px solid #E0E0E0',
                            ...(expandedRoom === room.id ? styles.expandedCard : {})
                          }}
                          onClick={(e) => {
                            if (selectedRoom === room.id) {
                              setSelectedRoom(null);
                            } else {
                              if (selectedRoom !== null) {
                                setSelectedRoom(null);
                              }
                            }
                          }}
                        >
                          <div style={{
                            ...styles.roomHeader,
                            padding: '0.25rem 0',
                            borderBottom: expandedRoom === room.id ? '1px solid rgba(49, 130, 246, 0.1)' : 'none'
                          }}>
                            <div style={{
                              display: 'flex', 
                              alignItems: 'center'
                            }}>
                              <span style={styles.roomTitle}>회의실 {room.roomNumber}</span>
                            </div>

                            <div style={{
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '0.75rem'
                            }}>
                              <button
                                style={{
                                  ...styles.pairingButton,
                                  backgroundColor: room.pairing ? 'rgba(49, 130, 246, 0.15)' : 'rgba(233, 236, 239, 0.7)',
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  apiTogglePairing(room.id, !room.pairing);
                                }}
                              >
                                페어링
                              </button>
                              
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                <span 
                                  style={{
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    color: room.status === 'on' ? '#e53e3e' : '#10b981',
                                  }}
                                >
                                </span>
                                <div 
                                  style={{
                                    ...styles.statusIndicator,
                                    backgroundColor: room.status === 'on' ? '#3182F6' : '#9CA3AF'
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <div style={styles.roomControls}>
                            {expandedRoom !== room.id && (
                              <button
                                style={{
                                  ...styles.expandToggle,
                                  marginTop: '0.5rem'
                                }}
                                onClick={(e) => toggleRoomExpand(room.id, e)}
                              >
                                ▼
                              </button>
                            )}
                          </div>
                          
                          {/* 확장 모드 컨텐츠 */}
                          {expandedRoom === room.id && (
                            <div style={{
                              marginTop: '1rem',
                              padding: '0.5rem',
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                              borderRadius: '0.5rem'
                            }}>
                              <div style={{
                                ...styles.expandButtons,
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '0.75rem'
                              }}>
                                <button 
                                  style={{
                                    ...styles.expandButton,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '2.5rem'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    apiIncreaseVolume(room.id);
                                  }}
                                >
                                  소리 키우기
                                </button>
                                <button 
                                  style={{
                                    ...styles.expandButton,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '2.5rem'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    apiDecreaseVolume(room.id);
                                  }}
                                >
                                  소리 줄이기
                                </button>
                                <button 
                                  style={{
                                    ...styles.expandButton,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '2.5rem'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    apiTurnOnMic(room.id);
                                  }}
                                >
                                  마이크 켜기
                                </button>
                                <button 
                                  style={{
                                    ...styles.expandButton,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '2.5rem'
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    apiTurnOffMic(room.id);
                                  }}
                                >
                                  마이크 끄기
                                </button>
                              </div>
                              <button
                                style={{
                                  ...styles.closeExpandButton,
                                  padding: '0.5rem',
                                  marginTop: '0.75rem'
                                }}
                                onClick={(e) => toggleRoomExpand(room.id, e)}
                              >
                                접기 ▲
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      padding: '1.5rem',
                      textAlign: 'center',
                      color: '#6b7280',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
                    }}>
                      현재 필터 조건에 맞는 회의실이 없습니다.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConferenceRoomDashboard;