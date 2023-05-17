import {
  NumberInput,
  Group,
  ActionIcon,
  rem,
  TextInput,
  Button,
  Tabs,
  MultiSelect,
  Select,
  SelectItem,
  Drawer,
  Card,
  Text,
  Badge,
  Grid,
  Stack,
  Space,
  Title,
} from "@mantine/core";
import Image from "next/image";
import { useLocalStorage, useDisclosure } from "@mantine/hooks";
import Partiler from "../assets/data/Partiler.json";
import ilcemahalle from "../assets/data/ilcemahalle.json";
import { useState, useEffect } from "react";
import akpLogo from "../assets/img/partiler/akp.png";
import chpLogo from "../assets/img/partiler/chp.jpg";
import iyiLogo from "../assets/img/partiler/iyi.jpg";
import yspLogo from "../assets/img/partiler/ysp.png";
import mhpLogo from "../assets/img/partiler/mhp.jpg";
import tipLogo from "../assets/img/partiler/tip.jpg";
import bbpLogo from "../assets/img/partiler/bbp.jpg";
import yrpLogo from "../assets/img/partiler/yrp.jpg";
import mpLogo from "../assets/img/partiler/mp.png";
import zaferLogo from "../assets/img/partiler/zafer.png";
import vatanLogo from "../assets/img/partiler/vatan.jpg";
import kkLogo from "../assets/img/cb/kilicdaroglu.png";
import soLogo from "../assets/img/cb/ogan.png";
import rteLogo from "../assets/img/cb/erdogan.png";
import miLogo from "../assets/img/cb/ince.png";
import headerLogo from "../assets/img/header-logo.png";

export default function SayimDokumCetveli() {
  const defaultParties = [
    "akp",
    "chp",
    "iyi",
    "ysp",
    "mhp",
    "tip",
    "yrp",
    "mp",
    "zafer",
  ];
  const [opened, { open, close }] = useDisclosure(false);
  const [sandikData, setSandikData, deleteSandikData] = useLocalStorage({
    key: "saved-sandik-data",
    defaultValue: [],
  });
  const [sonuclar, setSonuclar] = useState({});
  const [total, setTotal] = useState(0);
  const [isCumhur, setIsCumhur] = useState(true);
  const [partiler, setPartiler] = useState(defaultParties);
  const [titleData, setTitleData] = useState({
    il: "",
    ilce: "",
    okul: "",
    sandik: 0,
  });
  let selectedParties: string[] = [];

  const totalSonuc = () => {
    let sum = 0;
    // @ts-ignore
    for (const key in sonuclar) {
      // @ts-ignore
      if (typeof sonuclar[key] === "number") {
        // @ts-ignore
        sum += sonuclar[key];
      }
    }
    setTotal(sum);
  };

  const changeVoteNum = (activity: string, voteId: string) => {
    if (activity === "inc") {
      // @ts-ignore
      if (!sonuclar[voteId]) {
        // @ts-ignore
        sonuclar[voteId] = 1;
        // @ts-ignore
      } else sonuclar[voteId]++;
      const degisen = sonuclar;
      setSonuclar(degisen);
    } else if (activity === "dec") {
      // @ts-ignore
      if (sonuclar[voteId] > 0) {
        // @ts-ignore
        sonuclar[voteId]--;
        const degisen = sonuclar;
        setSonuclar(degisen);
      } else {
        setPartiler(partiler.filter((parti) => parti !== voteId));
      }
    }
    totalSonuc();
  };

  const saveSandik = () => {
    if (total === 0) return;

    const newSonuc = {
      title: { il: "", ilce: "", okul: "", sandik: 0 },
      results: {},
      toplam: 0,
      date: 0,
    };
    newSonuc.title.il = titleData.il;
    newSonuc.title.ilce = titleData.ilce;
    newSonuc.title.okul = titleData.okul;
    newSonuc.title.sandik = titleData.sandik;
    newSonuc.results = sonuclar;
    newSonuc.toplam = total;
    newSonuc.date = Date.now();
    // @ts-ignore
    setSandikData([...sandikData, newSonuc]);
    setSonuclar({});
    setTotal(0);
    setPartiler(defaultParties);
    setTitleData({
      il: "",
      ilce: "",
      okul: "",
      sandik: 0,
    });
  };

  const nameFinder = (key: string) => {
    const selected = Partiler.find((parti) => parti.id === key);
    return selected?.isim;
  };

  const imgFinder = (key: string) => {
    if (key === "akp") return akpLogo;
    if (key === "chp") return chpLogo;
    if (key === "iyi") return iyiLogo;
    if (key === "ysp") return yspLogo;
    if (key === "mhp") return mhpLogo;
    if (key === "tip") return tipLogo;
    if (key === "bbp") return bbpLogo;
    if (key === "yrp") return yrpLogo;
    if (key === "mp") return mpLogo;
    if (key === "zafer") return zaferLogo;
    if (key === "vatan") return vatanLogo;
    if (key === "rte") return rteLogo;
    if (key === "mi") return miLogo;
    if (key === "kk") return kkLogo;
    if (key === "so") return soLogo;
    else return headerLogo;
  };

  function multiSelectData() {
    const list: SelectItem[] = [];
    Partiler.forEach((element) => {
      if (!partiler.includes(element.id) && element.type === "p") {
        list.push({ value: element.id, label: element.isim });
      }
    });
    return list;
  }

  // const editSandik = (data: any) => {
  //   setSonuclar(data);
  //   setSandikData(sandikData.filter((sandik) => sandik != data));
  //   totalSonuc();
  // };

  const ilListe = ilcemahalle.data.map((il) => {
    return il.name;
  });

  function ilceListe(ilName: string) {
    if (!ilName) {
      return [];
    }
    const list: string[] = [];
    ilcemahalle.data
      .find((il) => il.name === ilName)
      ?.districts.map((ilce) => {
        return list.push(ilce.name);
      });
    return list;
  }

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title="Yeni parti ekle"
      >
        <div className="row">
          <div className="col-12 multi-selector">
            <MultiSelect
              onChange={(set) => (selectedParties = set)}
              data={multiSelectData()}
              id="multi-select-party"
            />
          </div>
          <div className="col-12 mt-5 d-flex justify-content-center">
            <Button
              variant="outline"
              onClick={() => {
                setPartiler([...partiler, ...selectedParties]);
                close();
              }}
            >
              Yeni Parti Ekle +
            </Button>
          </div>
        </div>
      </Drawer>
      <div className="container">
        {/* <div className="row mb-4">
          <Tabs defaultValue="cb">
            <Tabs.List grow position="apart">
              <Tabs.Tab
                onClick={() => {
                  setIsCumhur(true);
                  setSonuclar({});
                  setTotal(0);
                }}
                value="cb"
              >
                Cumhurbaşkanlığı
              </Tabs.Tab>
              <Tabs.Tab
                onClick={() => {
                  setIsCumhur(false);
                  setSonuclar({});
                  setTotal(0);
                  setPartiler(defaultParties);
                }}
                value="mv"
              >
                Milletvekilliği
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div> */}
        <div className="row mb-3 sandik-bilgisi">
          <div className="col-12 px-0">
            <TextInput label="Toplam Oy" defaultValue={total} />
          </div>
        </div>
        <div className="row">
          {Partiler.filter((parti) => parti.type === "a" && parti.runoff).map(
            (aday) => {
              return (
                <div key={aday.id} className="col-12 px-0 vote-box">
                  <span style={{ minWidth: "36px" }}>
                    <img
                      alt={aday.isim}
                      title={aday.isim}
                      src={imgFinder(aday.id).src}
                      className="party-img"
                    />
                  </span>
                  <span className="vote-name">{aday.isim}</span>
                  <Group className="numerator" spacing={5}>
                    <ActionIcon
                      size={36}
                      variant="filled"
                      onClick={() => changeVoteNum("dec", aday.id)}
                    >
                      -
                    </ActionIcon>
                    <NumberInput
                      hideControls
                      min={0}
                      styles={{
                        input: {
                          width: rem(50),
                          textAlign: "center",
                          paddingLeft: "8px",
                          paddingRight: "8px",
                        },
                      }}
                      id={aday.id}
                      //@ts-ignore
                      value={sonuclar[aday.id] || 0}
                      defaultValue={0}
                    />
                    <ActionIcon
                      size={36}
                      variant="filled"
                      onClick={() => changeVoteNum("inc", aday.id)}
                    >
                      +
                    </ActionIcon>
                  </Group>
                </div>
              );
            }
          )}
          {/* {isCumhur
            ? Partiler.filter((parti) => parti.type === "a").map((aday) => {
                return (
                  <div key={aday.id} className="col-12 px-0 vote-box">
                    <span style={{ minWidth: "36px" }}>
                      <img
                        alt={aday.isim}
                        title={aday.isim}
                        src={imgFinder(aday.id).src}
                        className="party-img"
                      />
                    </span>
                    <span className="vote-name">{aday.isim}</span>
                    <Group className="numerator" spacing={5}>
                      <ActionIcon
                        size={36}
                        variant="filled"
                        onClick={() => changeVoteNum("dec", aday.id)}
                      >
                        -
                      </ActionIcon>
                      <NumberInput
                        hideControls
                        min={0}
                        styles={{
                          input: {
                            width: rem(50),
                            textAlign: "center",
                            paddingLeft: "8px",
                            paddingRight: "8px",
                          },
                        }}
                        id={aday.id}
                        //@ts-ignore
                        value={sonuclar[aday.id] || 0}
                        defaultValue={0}
                      />
                      <ActionIcon
                        size={36}
                        variant="filled"
                        onClick={() => changeVoteNum("inc", aday.id)}
                      >
                        +
                      </ActionIcon>
                    </Group>
                  </div>
                );
              })
            : Partiler.filter((parti) => parti.type === "p").map((aday) => {
                if (partiler.includes(aday.id))
                  return (
                    <div key={aday.id} className="col-12 px-0 vote-box">
                      <span style={{ minWidth: "50px" }}>
                        <img
                          alt={aday.isim}
                          title={aday.isim}
                          src={imgFinder(aday.id).src}
                          className="party-img"
                        />
                      </span>
                      <span className="vote-name">{aday.isim}</span>
                      <Group className="numerator" spacing={5}>
                        <ActionIcon
                          size={36}
                          variant="filled"
                          onClick={() => changeVoteNum("dec", aday.id)}
                        >
                          -
                        </ActionIcon>
                        <NumberInput
                          hideControls
                          min={0}
                          styles={{
                            input: {
                              width: rem(50),
                              textAlign: "center",
                              paddingLeft: "8px",
                              paddingRight: "8px",
                            },
                          }}
                          id={aday.id}
                          //@ts-ignore
                          value={sonuclar[aday.id] || 0}
                          defaultValue={0}
                        />
                        <ActionIcon
                          size={36}
                          variant="filled"
                          onClick={() => changeVoteNum("inc", aday.id)}
                        >
                          +
                        </ActionIcon>
                      </Group>
                    </div>
                  );
              })} */}
        </div>
        {!isCumhur && (
          <div className="row mb-3">
            <div className="col-12 mt-3 d-flex justify-content-center">
              <Button variant="outline" onClick={open}>
                Yeni Parti Ekle +
              </Button>
            </div>
          </div>
        )}
        <div className="row mb-3 sandik-bilgisi">
          <div className="col-12 px-0">
            <Select
              label="İl"
              id="il-select"
              data={ilListe}
              value={titleData.il}
              onChange={(il) => {
                if (il !== titleData.il)
                  setTitleData({
                    ...titleData,
                    il: il ?? "",
                    ilce: "",
                  });
              }}
            />
          </div>
          <div className="col-12 px-0">
            <Select
              label="İlçe"
              id="ilce-select"
              data={ilceListe(titleData.il)}
              value={titleData.ilce}
              onChange={(ilce) => {
                setTitleData({ ...titleData, ilce: ilce ?? "" });
              }}
              disabled={ilceListe(titleData.il).length < 1}
            />
          </div>

          <div className="col-6 pl-0">
            <TextInput
              placeholder="Ör: Atatürk Anadolu Lisesi"
              label="Okul İsmi"
              id="school-name"
              value={titleData.okul}
              onChange={(okul) => {
                setTitleData({
                  ...titleData,
                  okul: okul.currentTarget.value ?? "",
                });
              }}
            />
          </div>
          <div className="col-6 pr-0">
            <NumberInput
              label="Sandık Numarası"
              id="sandik-number"
              value={titleData.sandik}
              onChange={(sandik) => {
                setTitleData({
                  ...titleData,
                  sandik: sandik ? sandik : 0,
                });
              }}
            />
          </div>
          <div className="col-12 mt-3 d-flex justify-content-center">
            <Button variant="light" onClick={saveSandik}>
              Sandığı Cihazına Kaydet
            </Button>
          </div>
        </div>
        {sandikData.length > 0 && (
          <div className="row">
            <p>Kayıtlı Sandıklar</p>
            <Grid gutter="sm">
              {sandikData.map((data: any, i) => {
                const title =
                  [data.title.il, data.title.ilce, data.title.okul]
                    .filter(Boolean)
                    .join(" ") || `Sandık ${i + 1}`;
                return (
                  <Grid.Col key={i} sm={12} md={6}>
                    <Card shadow="sm" withBorder>
                      <Stack spacing="md">
                        <Group position="apart">
                          <Title order={4}>{title}</Title>
                          {data.title.sandik && (
                            <Badge>{data.title.sandik}</Badge>
                          )}
                        </Group>
                        {Object.entries(data.results).map(([key, value]) => {
                          const name = nameFinder(key);
                          return (
                            <Group key={key}>
                              <Image
                                alt={name as string}
                                src={imgFinder(key).src}
                                width={36}
                                height={44}
                              />
                              {name}: {value as number}
                            </Group>
                          );
                        })}
                        Toplam:{" "}
                        {
                          Object.values(data.results).reduce(
                            (a: any, b: any) => a + b,
                            0
                          ) as number
                        }
                      </Stack>
                    </Card>
                  </Grid.Col>
                );
              })}
            </Grid>
            <div className="col-12 my-3 d-flex justify-content-center">
              <Button variant="light" onClick={deleteSandikData}>
                Cihazındaki Kayıtları Sıfırla
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
