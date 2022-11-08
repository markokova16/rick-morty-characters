import { GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import imageLoader from "../../imageLoader";
import { Character, GetCharacterResults } from "../../types";
import styles from "../../styles/Character.module.css";

function CharacterPage({ character }: { character: Character }) {
  const router = useRouter();

  return (
    <div className="flex flex-col ">
      <h1 className="text-red-700">{character.name}</h1>

      <Image
        loader={imageLoader}
        unoptimized
        src={character.image}
        alt={character.name}
        width="200px"
        height="200px"
      />
      <div className="flex flex-col text-center justify-between text-blue-700">
        <h1>{character.gender}</h1>
        <h1>{character.species}</h1>
        <h1>{character.status}</h1>
      </div>
    </div>
  );
}

CharacterPage.getLayout = function getLayout(page: typeof CharacterPage) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const { results }: GetCharacterResults = await res.json();

  return {
    paths: results.map((character) => {
      return { params: { id: String(character.id) } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
}

export default CharacterPage;
