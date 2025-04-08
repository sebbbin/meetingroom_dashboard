import React, { useState } from 'react';

const ConferenceRoomDashboard = () => {
  // 총 54개의 회의실 데이터 (6x9 그리드)
  const [rooms, setRooms] = useState(
    Array.from({ length: 54 }, (_, index) => ({
      id: index + 1,
      status: Math.random() > 0.5 ? 'on' : 'off',
      pairing: Math.random() > 0.7,
          }))
  );

  // 필터 상태 (all, on, off)
  const [filter, setFilter] = useState('all');
  
  // 선택된 회의실 ID
  const [selectedRoom, setSelectedRoom] = useState(null);
  // 확장된 회의실 ID
  const [expandedRoom, setExpandedRoom] = useState(null);

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

  // 온/오프 회의실 수 및 목록 계산
  const onRooms = rooms.filter(room => room.status === 'on');
  const onRoomsCount = onRooms.length;
  const onRoomsList = onRooms.map(room => room.id).join(', ');
  const offRoomsCount = rooms.filter(room => room.status === 'off').length;

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
  const filteredRooms = rooms.filter((room) => {
    if (filter === 'all') return true;
    return room.status === filter;
  });

  // 인라인 스타일 정의
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
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
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
    unavailableList: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    buttonContainer: {
      display: 'flex', 
      gap: '0.5rem',
      marginBottom: '1.5rem'
    },
    button: {
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      transition: 'all 0.3s',
      cursor: 'pointer',
      border: 'none'
    },
    buttonActive: {
      backgroundColor: mainColor,
      color: 'white'
    },
    buttonInactive: {
      backgroundColor: 'white',
      color: '#333333'
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '1rem'
    },
    roomCard: {
      position: 'relative',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      overflow: 'hidden',
      backgroundColor: 'white',
      cursor: 'pointer',
      padding: '0.75rem',
      borderLeft: '4px solid transparent',
      transition: 'height 0.3s ease-in-out, min-height 0.3s ease-in-out'
    },
    expandedCard: {
      minHeight: '260px',
      backgroundColor: '#f0f5ff',
      gridRow: 'span 2',
      zIndex: 10
    },
    roomHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    roomHeaderContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '0.5rem'
    },
    roomTitle: {
      fontWeight: 'bold',
      fontSize: '0.875rem'
    },
    statusIndicator: {
      width: '0.6rem',
      height: '0.6rem',
      borderRadius: '50%',
      display: 'inline-block'
    },
    location: {
      fontSize: '0.75rem',
      color: '#6b7280',
    },
    roomControls: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '8px',
    },
    pairingButton: {
      fontSize: '0.75rem',
      padding: '2px 8px',
      borderRadius: '0.25rem',
      border: 'none',
      cursor: 'pointer',
      height: '22px',
      marginLeft: '6px',
      marginRight: '4px'
    },
    expandToggle: {
      border: 'none',
      backgroundColor: 'transparent',
      color: mainColor,
      cursor: 'pointer',
      fontSize: '0.75rem',
      padding: '2px 8px',
      margin: '4px auto',
      textAlign: 'center'
    },
    expandButtons: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '12px'
    },
    expandButtonsRow: {
      display: 'flex',
      width: '100%',
      gap: '8px'
    },
    expandButton: {
      backgroundColor: '#e6f0ff',
      color: '#3182F6',
      border: 'none',
      padding: '6px 10px',
      borderRadius: '4px',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '12px',
      flex: 1
    },
    closeExpandButton: {
      border: 'none',
      backgroundColor: 'transparent',
      color: mainColor,
      cursor: 'pointer',
      fontSize: '12px',
      textAlign: 'right',
      marginTop: '8px',
      width: '100%'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>회의실 대시보드</h1>
      
      {/* 상태 요약 */}
      <div style={styles.statusBox}>
        <div style={styles.statusContent}>
          <div style={styles.statusText}>
            현재 상태: <span style={styles.statusBold}>{onRoomsCount}개 회의실 사용 중</span>
          </div>
          <div style={styles.statusText}>
            사용 가능 회의실: <span style={styles.statusBold}>{offRoomsCount}개</span>
          </div>
        </div>
        <div style={styles.unavailableList}>
          사용 불가 회의실: {onRoomsList}
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

      {/* 회의실 그리드 */}
      <div style={styles.gridContainer}>
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            style={{
              ...styles.roomCard,
              borderLeft: room.status === 'on' ? `4px solid ${mainColor}` : '4px solid #E0E0E0',
              marginBottom: '20px',
              ...(expandedRoom === room.id ? styles.expandedCard : {})
            }}
            onClick={(e) => {
              // 클릭했을 때 설정 메뉴가 아닌 확장 토글 버튼이 나타나도록 수정
              if (selectedRoom === room.id) {
                setSelectedRoom(null); // 설정 패널 닫기
              } else {
                // 다른 카드의 설정 메뉴가 열려있을 때 닫기
                if (selectedRoom !== null) {
                  setSelectedRoom(null);
                }
              }
            }}
          >
            <div style={styles.roomHeader}>
              <div style={styles.roomHeaderContent}>
                <span style={styles.roomTitle}>회의실 {room.id}</span>
                <button
                  style={{
                    ...styles.pairingButton,
                    backgroundColor: room.pairing ? 'rgba(49, 130, 246, 0.1)' : 'rgba(233, 236, 239, 0.5)',
                    color: mainColor
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    apiTogglePairing(room.id, !room.pairing);
                  }}
                >
                  페어링
                </button>
                <span style={styles.location}>{room.location}</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <span 
                  style={{
                    ...styles.statusText,
                    color: room.status === 'on' ? '#D32F2F' : mainColor
                  }}
                >
                </span>
                <div 
                  style={{
                    ...styles.statusIndicator,
                    backgroundColor: room.status === 'on' ? mainColor : '#BDBDBD'
                  }}
                ></div>
              </div>
            </div>
            
            <div style={styles.roomControls}>
              {expandedRoom !== room.id && (
                <button
                  style={styles.expandToggle}
                  onClick={(e) => toggleRoomExpand(room.id, e)}
                >
                  더 보기 ▼
                </button>
              )}
            </div>
            
            {/* 확장 모드 컨텐츠 */}
            {expandedRoom === room.id && (
              <div style={{marginTop: 'px'}}>
                <div style={styles.expandButtons}>
                  <div style={styles.expandButtonsRow}>
                    <button 
                      style={styles.expandButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        apiIncreaseVolume(room.id);
                      }}
                    >
                      소리 키우기
                    </button>
                    <button 
                      style={styles.expandButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        apiDecreaseVolume(room.id);
                      }}
                    >
                      소리 줄이기
                    </button>
                  </div>
                  <div style={styles.expandButtonsRow}>
                    <button 
                      style={styles.expandButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        apiTurnOnMic(room.id);
                      }}
                    >
                      마이크 켜기
                    </button>
                    <button 
                      style={styles.expandButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        apiTurnOffMic(room.id);
                      }}
                    >
                      마이크 끄기
                    </button>
                  </div>
                  <button
                    style={styles.closeExpandButton}
                    onClick={(e) => toggleRoomExpand(room.id, e)}
                  >
                    접기 ▲
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferenceRoomDashboard;