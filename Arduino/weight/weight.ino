#include <avr/sleep.h>

#define PIN 2
#define LED 13

#define SHORT_TIMEOUT 5000
#define LONG_TIMEOUT 1000000


void deepSleep() {
  set_sleep_mode(SLEEP_MODE_PWR_SAVE);

  // Arduino Uno では、以下のコードにより2番ピンの変化を受けてスリープから復帰できる
  attachInterrupt(0, wakeup, FALLING);
  digitalWrite(LED, LOW);
  delay(100);

  sleep_enable();
  sleep_mode();
  sleep_disable();

  detachInterrupt(0);
  digitalWrite(LED, HIGH);
}

void wakeup() {
  delay(100);
}

// 先の状態遷移図に対応する関数
// 新しい信号が来なくなったら、最後に読んだ体重値を return する
unsigned long receive() {
  uint32_t count = 0;
  uint32_t bits = 0;
  uint32_t ret = 0;

  while (true) {
    unsigned long pulse = pulseIn(PIN, HIGH, SHORT_TIMEOUT);
    if (pulse == 0) {
      if (count != 0) {
        /* 信号が 39bit かつ、体重が安定しているときに保存する。
　　　　　　先頭 12 bit は固定で 0b101010110000 = 0xAB8
           安定を示す次の 2ビットが 11 、更に続く 2 bit は常に 0 である。
           よって、体重が安定したとき、信号の先頭 16 bit は 0xAB8C になる。
         */
        if ((count == 39) && (bits >> 16 == 0xAB8C)) {
          // SALUTE 体重計の測定上限は 150kg (1500) までなので、 11bit 取れば十分
          ret = bits & 0x7ff;
        }
        count = 0;
        continue;
      }

      pulse = pulseIn(PIN, HIGH, LONG_TIMEOUT);
      if (pulse == 0) {
        break;
      }
    }

    if (count < 32) {
      unsigned long b = pulse < 750 ? 1 : 0;
      bitWrite(bits, 31 - count, b);
    }
    ++count;
  }

  return ret;
}

void setup() {
  cli();
  pinMode(PIN, INPUT);
  pinMode(LED, OUTPUT);
  Serial.begin(115200);
  sei();

  Serial.println("");
  delay(100);

  digitalWrite(LED, LOW);
}

void loop() {
  uint32_t v;

  do {
    deepSleep();
    delay(100);
  } while ((v = receive()) == 0);
  Serial.println(v/10.0);
  delay(200);
}
